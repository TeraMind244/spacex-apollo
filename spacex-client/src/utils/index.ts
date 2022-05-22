import galaxy from "../assets/images/galaxy.jpg";
import iss from "../assets/images/iss.jpg";
import moon from "../assets/images/moon.jpg";

const backgrounds = [galaxy, iss, moon];

export function getBackgroundImage(id: string) {
	return `url(${backgrounds[Number(id) % backgrounds.length]})`;
}
