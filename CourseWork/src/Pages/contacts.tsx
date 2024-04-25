const Contacts = () => {
    return (
        <div className="contacts-container">
            <h2>Contact Us</h2>

            <div className="map-container">
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.0070630841043!2d-122.40891548572692!3d37.784839672444224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580864d6071a3%3A0xa2311011e6febb94!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1649043840270!5m2!1sen!2sus"
                    width="800"
                    height="450"
                    style={{ border: 0 }}

                    loading="lazy"
                ></iframe>
            </div>

            <div className="useful-numbers">
                <h3>Useful Numbers</h3>
                <ul>
                    <li>Emergency problem with accounts: +1-2465-254-254</li>
                    <li>Problems with account passwords: +1-2482-254-254</li>
                    <li>Student Support: +1-2490-254-254</li>
                </ul>
            </div>

            <div className="useful-links">
                <h3>Useful Links</h3>
                <ul>
                    <li>
                        <a href="tel:123-456-7890">Call Calium</a>
                    </li>
                    <li>
                        <a href="mailto:info@example.com">Email Calium</a>
                    </li>
                    <li>
                        <a href="https://example.com">Calium university website</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Contacts;
