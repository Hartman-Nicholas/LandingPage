// TODO: remove this temporary component when BE fixes feed api
export default function Feed() {
    return (
      <div className="center">
        <div className="centerWrapper">
          HomeFeed Page
{/* Current: a sample div with posts for showcase
TODO: render posts taking from post component.  */}
          <div>
            <div className="item">
              <div className="itemWrapper">
                <div className="itemTop">
                  <div className="itemTopLeft">
                    <img
                      src={
                        require("../assets/CITY-STO-1.jpeg").default
                      }
                      alt=""
                      className="itemProfileImg"
                    />
                    <span className="itemUserName"> Anna</span>
                    <span className="itemDate">5 minutes ago</span>
                  </div>
                  <div className="itemTopRight">
                  </div>
                </div>
                <div className="itemCenter">
                  <span className="itemText">Hey! It is my first post :)</span>
                  <img
                    className="itemImg"
                    src={require("../assets/CITY-STO-1.jpeg").default}
                  />
                </div>
                <div className="itemBottom">
                  <div className="itemBottomRight">
                    <span className="itemCommentText">10 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
