import './ProblemSolution.css';

const PROMISES = [
    {
        title: 'A design made for your business',
        text: 'Your site is designed around your brand and your customers, not poured into a template.',
    },
    {
        title: 'Prices you can see',
        text: 'Every package has a starting price and a delivery time on this page. Anything extra is quoted before we start.',
    },
    {
        title: 'Enquiries answered on WhatsApp',
        text: 'An assistant trained on your services replies to customers, books appointments and passes real leads to you.',
    },
    {
        title: 'Support after launch',
        text: 'Every project includes a support period. Monthly plans cover updates, hosting and performance checks.',
    },
];

const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const ProblemSolution = () => (
    <section id="why-us" className="problem-solution">
        <div className="container ps-layout">
            <h2 className="ps-title">What you get when you work with us</h2>

            <ul className="ps-list">
                {PROMISES.map((p) => (
                    <li key={p.title} className="ps-item">
                        <h3 className="ps-item-title">{p.title}</h3>
                        <p className="ps-item-text">{p.text}</p>
                    </li>
                ))}
            </ul>

            <div className="ps-cta">
                <p className="ps-cta-text">
                    Not sure which package fits? Book a free 30-minute call and we will recommend one.
                </p>
                <button type="button" className="ps-cta-btn" onClick={scrollToContact}>
                    Book a free call
                </button>
            </div>
        </div>
    </section>
);

export default ProblemSolution;
