import React from 'react'

export default function Feed() {
    return (
      <div className="center">
        <div className="centerWrapper">
          HomeFeed Page
{/* Current: a sample div with posts for showcase
TODO: render posts taking from post component.  */}
          <div>
            <div className="post">
              <div className="postWrapper">
                <div className="postTop">
                  <div className="postTopLeft">
                    <img
                      src={
                        require("../assets/CITY-STO-1.jpeg").default
                      }
                      alt=""
                      className="postProfileImg"
                    />
                    <span className="postUserName"> Anna</span>
                    <span className="postDate">5 minutes ago</span>
                  </div>
                  <div className="postTopRight">
                  </div>
                </div>
                <div className="postCenter">
                  <span className="postText">Hey! It is my first post :)</span>
                  <img
                    className="postImg"
                    src={require("../assets/CITY-STO-1.jpeg").default}
                  />
                </div>
                <div className="postBottom">
                  <div className="postBottomRight">
                    <span className="postCommentText">10 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
