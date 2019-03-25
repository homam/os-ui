import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, { IProps, initialState } from "../../clients/one-click/HOC"

import './assets/css/style.less?raw';
import './assets/js/script.js';

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Unknown" //TODO: replace Unknown with your page's name
);

class Root extends React.PureComponent<IProps> {
  state = {
    locale: "en"
  };
  render() {
    return (
      <div>

        <div className="container">

          <div className="list-container">

            <div className="title">Videos</div>

            <div className="categories">
              <div className="category-item">Popular</div>
              <div className="category-item">Action</div>
              <div className="category-item">Drama</div>
              <div className="category-item">Adventure</div>
              <div className="category-item">Thriller</div>
            </div>

            <div className="thumbs-container">
              <div className="thumbs-intro">
                <div className="thumbs-category">Action</div>

                <div className="thumbs-options">200+ OPTIONS</div>
              </div>

              <div className="thumbs">
                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
          </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>

                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
          </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>

                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
        </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>

                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
        </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>


              </div>

            </div>

            <div className="thumbs-container">
              <div className="thumbs-intro">
                <div className="thumbs-category">Action</div>

                <div className="thumbs-options">200+ OPTIONS</div>
              </div>

              <div className="thumbs">
                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
          </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>

                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
          </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>

                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
        </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>

                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
        </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>


              </div>

            </div>

            <div className="thumbs-container">
              <div className="thumbs-intro">
                <div className="thumbs-category">Action</div>

                <div className="thumbs-options">200+ OPTIONS</div>
              </div>

              <div className="thumbs">
                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
          </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>

                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
          </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>

                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
        </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>

                <div className="thumb">

                  <div className="img"></div>
                  <div className="thumb-info">

                    <div className="thumb-name">
                      Hacksaw Ridge
        </div>

                    <div className="rating">
                      <span>6.9</span>
                      <span className="stars"></span>
                    </div>

                  </div>

                </div>


              </div>

            </div>


          </div>

          <div className="details-page">

            <div className="player">

              <div className="progress-bar-container">

<div className="duration">1:34:23</div>
                <div className="progress-bar">
                </div>

              </div>

            </div>

            <div className="player-info">

              <div className="views">
                192 024 Views
            </div>

              <div className="stats">
                <span>19K views</span>
                <span>17K likes</span>
                <span>17K likes</span>
              </div>

            </div>

            <div className="comments-header"></div>

            <div className="comments">


              <div className="comment">
                <div className="user"></div>
                <div className="comment-details">

                  <div className="name">Fall Out Boy - Umna  Thurman Red Bull…</div>

                  <div className="post-time">
                    3h ago
            </div>

                  <p className="user-comment">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar finibus condimentum. Fusce non risus in dolor lobortis cursus.
            </p>


                </div>
              </div>

              <div className="comment">
                <div className="user"></div>
                <div className="comment-details">

                  <div className="name">Fall Out Boy - Umna  Thurman Red Bull…</div>

                  <div className="post-time">
                    3h ago
            </div>

                  <p className="user-comment">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar finibus condimentum. Fusce non risus in dolor lobortis cursus.
            </p>


                </div>
              </div>


              <div className="comment">
                <div className="user"></div>
                <div className="comment-details">

                  <div className="name">Fall Out Boy - Umna  Thurman Red Bull…</div>

                  <div className="post-time">
                    3h ago
            </div>

                  <p className="user-comment">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar finibus condimentum. Fusce non risus in dolor lobortis cursus.
            </p>


                </div>
              </div>


              <div className="comment">
                <div className="user"></div>
                <div className="comment-details">

                  <div className="name">Fall Out Boy - Umna  Thurman Red Bull…</div>

                  <div className="post-time">
                    3h ago
            </div>

                  <p className="user-comment">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar finibus condimentum. Fusce non risus in dolor lobortis cursus.
            </p>


                </div>
              </div>

            </div>


          </div>



          <TranslationProvider locale={this.state.locale}>
            <div>
              <button onClick={() => this.props.actions.onClick()}>Click here!</button>
            </div>
          </TranslationProvider>
        </div>
      </div>
    );
  }
}
export default HOC(tracker, null, Root)(initialState);