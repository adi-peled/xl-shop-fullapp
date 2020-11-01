import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
//icons-svgs
import { ReactComponent as LocationSvg } from '../../assets/img/location.svg';
import { ReactComponent as EmailSvg } from '../../assets/img/email.svg';
import { ReactComponent as PhoneSvg } from '../../assets/img/phone.svg';
import { ReactComponent as WhatsappSvg } from '../../assets/img/whatsapp.svg'
import './Footer.scss'
import { useState } from 'react';
export function Footer() {

    const [style, setStyle] = useState({
        svgFirst: { fill: 'white', cursor: 'default' }, labelFirst: { color: 'white', cursor: 'default' },
        svgSecond: { fill: 'white', cursor: 'default' }, labelSecond: { color: 'white', cursor: 'default' }
    })
    // setState(state => ({ ...state, editedUser: { ...state.editedUser, [field]: value } }))

    function hover(color, cursor, idx) {
        if (idx === '1') {
            setStyle(style => ({ ...style, svgFirst: { ...style.svg, fill: color, cursor } }))
            setStyle(style => ({ ...style, labelFirst: { ...style.label, color, cursor } }))
        } else {
            setStyle(style => ({ ...style, svgSecond: { ...style.svg, fill: color, cursor } }))
            setStyle(style => ({ ...style, labelSecond: { ...style.label, color, cursor } }))
        }
    }


    return (
        <footer className="flex column">
            <div className="flex content">
                <div className="contact-us">
                    <h3>Contact Us</h3>
                    <ul  >
                        <li  >
                            <a onMouseOver={() => hover('#f79898', 'pointer', '1')} onMouseOut={() => hover('white', 'default', '1')}
                                target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=zion71il@gmail.com&su=&body=נא להשאיר פרטי קשר שנוכל לחזור אליכם ">
                                <EmailSvg style={style.svgFirst} className="svg"></EmailSvg>
                                <label style={style.labelFirst} > Email Us</label>
                            </a>
                        </li>
                        <li >
                            <a onMouseOver={() => hover('#f79898', 'pointer', '2')} onMouseOut={() => hover('white', 'default', '2')}
                                target="_blank" href="https://wa.link/s69g6e">
                                <WhatsappSvg style={style.svgSecond} className="svg"></WhatsappSvg>

                                <label style={style.labelSecond}  >  Send Whatsapp</label></a>
                        </li>
                        <li>
                            <PhoneSvg className="svg"></PhoneSvg>
                            <label> Business Phone: 089461751</label>
                        </li>
                        <li>
                            <LocationSvg className="svg"></LocationSvg>
                            <label >Address:  Bilu Street 23 Rehovot </label>
                        </li>
                    </ul>
                </div>


                <div className="categories">
                    <h3>Top Categories</h3>
                    <ul>
                        <li> <Link to="/shop/Polo-Shirts">Polo Shirts </Link>  </li>
                        <li> <Link to="/shop/T-Shirts">T-Shirts </Link>  </li>
                        <li> <Link to="/shop/Elegeant-Pants">Elegenat Pants </Link>  </li>
                        <li> <Link to="/shop/Coats">Coats </Link>  </li>
                        <li> <Link to="/shop/Belts">Belts </Link>  </li>
                        <li> <Link to="/shop/Ties">Ties </Link>  </li>
                        <li> <Link to="/shop/Jeans">Jeans </Link>  </li>
                    </ul>
                </div>
                <div className="pages">
                    <h3>Main Pages</h3>
                    <ul>
                        <li> <Link to="/">Home </Link>  </li>
                        <li> <Link to="/profile/wishlist">Profile </Link>  </li>
                        <li> <Link to="/shop">Shop</Link>  </li>
                        <li> <Link to="/cart">Cart</Link>  </li>
                        <li> <Link to="/login">Login </Link>  </li>
                    </ul>
                </div>
            </div>


        </footer>



    );
}