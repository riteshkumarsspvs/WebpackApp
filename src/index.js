import getText from "./appService.js"
import {v4 as uuid} from "uuid"
import  "./styles/style.scss";
import "./styles/otherStyle.scss";
import image from "./asset/Screenshot.png"
import "./withIndex.js"

console.log(getText());
console.log(uuid());
alert(uuid());
document.getElementById('img').src=image;