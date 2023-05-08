import React, { useEffect } from "react";
import "./slideHero.css";

const SlideHero = () => {
  useEffect(() => {
    var $cont = document.querySelector(".cont");
    var $elsArr = [].slice.call(document.querySelectorAll(".el"));
    var $closeBtnsArr = [].slice.call(
      document.querySelectorAll(".el__close-btn")
    );

    setTimeout(function () {
        $cont.classList.remove("s--inactive");
      }, 200);
    
      $elsArr.forEach(function ($el) {
        $el.addEventListener("click", function () {
          if (this.classList.contains("s--active")) return;
          $cont.classList.add("s--el-active");
          this.classList.add("s--active");
        });
      });
    
      $closeBtnsArr.forEach(function ($btn) {
        $btn.addEventListener("click", function (e) {
          e.stopPropagation();
          $cont.classList.remove("s--el-active");
          $cont.classList.add("blank");
          document.querySelector(".el.s--active").classList.remove("s--active");
        });
      });
  }, []);

  

  return (
    <div className="cont s--inactive">
      {/* cont inner start */}
      <div className="cont__inner">
        {/* el start */}
        <div className="el">
          <div className="el__overflow">
            <div className="el__inner">
              <div className="el__bg"></div>
              <div className="el__preview-cont">
                <h2 className="el__heading">Past Projects</h2>
              </div>
              <div className="el__content">
                <div className="el__text">Checkout our previous projects</div>
                <div className="el__close-btn"></div>
              </div>
            </div>
          </div>
          <div className="el__index">
            <div className="el__index-back">1</div>
            <div className="el__index-front">
              <div className="el__index-overlay" data-index="1">
                1
              </div>
            </div>
          </div>
        </div>
        {/* el end */}
        {/* el start */}
        <div className="el">
          <div className="el__overflow">
            <div className="el__inner">
              <div className="el__bg"></div>
              <div className="el__preview-cont">
                <h2 className="el__heading">Current Projects</h2>
              </div>
              <div className="el__content">
                <div className="el__text">
                  Checkout what we are building now
                </div>
                <div className="el__close-btn"></div>
              </div>
            </div>
          </div>
          <div className="el__index">
            <div className="el__index-back">2</div>
            <div className="el__index-front">
              <div className="el__index-overlay" data-index="2">
                2
              </div>
            </div>
          </div>
        </div>
        {/* el end */}
        {/* el start */}
        <div className="el">
          <div className="el__overflow">
            <div className="el__inner">
              <div className="el__bg"></div>
              <div className="el__preview-cont">
                <h2 className="el__heading">Upcoming Projects</h2>
              </div>
              <div className="el__content">
                <div className="el__text">
                  Take a look at our upcoming projects
                </div>
                <div className="el__close-btn"></div>
              </div>
            </div>
          </div>
          <div className="el__index">
            <div className="el__index-back">3</div>
            <div className="el__index-front">
              <div className="el__index-overlay" data-index="3">
                3
              </div>
            </div>
          </div>
        </div>
        {/* el end */}
      </div>
      {/* cont inner end */}
    </div>
  );
};

export default SlideHero;
