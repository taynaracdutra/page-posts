import { Component } from "react";
import "./styles.css";
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/SearchInput";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;

    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts); /*spread operator */

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filterPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toUpperCase().includes(searchValue.toUpperCase());
        })
      : posts; /* operação ternária */

    return (
      <section className="container">
        <div className="input-container">
          <InputSearch
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filterPosts.length > 0 && <Posts posts={filterPosts} />}

        {filterPosts.length === 0 && <p>Não existem posts</p>}

        <div disabled className="button-container">
          {!searchValue /*short-circuit js */ && (
            <Button
              onClick={this.loadMorePosts}
              text="Reload more posts"
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
