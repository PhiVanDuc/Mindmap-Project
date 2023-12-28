import '@/global_components/styleFooter.scss'

export default function Footer() {
    return (
        <footer className='footer-main'>
            <div className="container">
                <div className="top-footer">
                    <div className="left">
                        <div className="left-item">
                            <h3>Features</h3>

                            <ul>
                                <li>
                                    <a href="">Cool stuff</a>
                                </li>
                                
                                <li>
                                    <a href="">Random feature</a>
                                </li>
                                
                                <li>
                                    <a href="">Team feature</a>
                                </li>
                                
                                <li>
                                    <a href="">Stuff for developers</a>
                                </li>
                                
                                <li>
                                    <a href="">Another one</a>
                                </li>
                                
                                <li>
                                    <a href="">Last time</a>
                                </li>
                            </ul>
                        </div>

                        <div className="left-item">
                            <h3>Resources</h3>

                            <ul>
                                <li>
                                    <a href="">Resource</a>
                                </li>
                                
                                <li>
                                    <a href="">Resource name</a>
                                </li>
                                
                                <li>
                                    <a href="">Another resource</a>
                                </li>
                                
                                <li>
                                    <a href="">Final resource</a>
                                </li>
                            </ul>
                        </div>

                        <div className="left-item">
                            <h3>About</h3>

                            <ul>
                                <li>
                                    <a href="">Team</a>
                                </li>
                                
                                <li>
                                    <a href="">Locations</a>
                                </li>
                                
                                <li>
                                    <a href="">Privacy</a>
                                </li>
                                
                                <li>
                                    <a href="">Terms</a>
                                </li>
                            </ul>
                        </div>

                        <div className="left-item">
                            <h3>Help</h3>

                            <ul>
                                <li>
                                    <a href="">Support</a>
                                </li>
                                
                                <li>
                                    <a href="">Help Center</a>
                                </li>
                                
                                <li>
                                    <a href="">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="right">
                        <h3>Stay connected</h3>

                        <div className="network-social-logos">
                            <div className="facebook">
                                <a href="">facebook</a>
                            </div>

                            <div className="twitter">
                                <a href="">twitter</a>
                            </div>

                            <div className="google">
                                <a href="">google</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom-footer">
                    <div className="left">
                        <div className="left-item">
                            <h3>FWR</h3>
                        </div>

                        <div className="left-item">
                            <h3>Address</h3>

                            <p>123 6th St.</p>
                            <p>Melbourne, FL 32904</p>
                        </div>

                        <div className="left-item">
                            <h3>Free Resources</h3>

                            <p>Use our HTML blocks for FREE.</p>
                            <p>All are MIT License</p>
                        </div>
                    </div>

                    <div className="right">
                        <button className='button-start'>Get Start</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
