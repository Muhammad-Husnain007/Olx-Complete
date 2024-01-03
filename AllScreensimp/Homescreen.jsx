import Navbar from '../Navbar/Navbar.jsx'
import Cards from '../Categories/Cards.jsx'
import Slider from '../Categories/SlickSlider.jsx'
import Cars from '../Cars/carsCards.jsx'
import MobilePhones from '../MobliePhones/MobileCards.jsx'
import Bikes from '../Bikes/bikesCards.jsx'
import Tablet from '../Tablet/tabletsCards.jsx'
import TVA from '../TVA/tvaCards.jsx'
import Plot from '../Plot/plotsCards.jsx'
import Houses from '../Houses/housesCards.jsx'
import FooterList from '../Footer/FooterList.jsx'

const Homescreen = () => {
    return (
        <div>
            <Navbar />
            <Slider />
            <Cards />
            <MobilePhones />
            <Cars />
            <Bikes />
            <Tablet />
            <Houses />
            <TVA />
            <Plot />
            <FooterList />
        </div>
    )
}

export default Homescreen;