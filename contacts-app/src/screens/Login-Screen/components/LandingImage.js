import React from "react";
import "./LandingImage.sass";
const peopleConnecting = require("../../../images/people-connecting.png");

function LandingImage() {
  return (
    <section className="landingImageWrapper">
      <img src={peopleConnecting} className="landingImageWrapper__image"></img>
    </section>
  );
}

export default LandingImage;
