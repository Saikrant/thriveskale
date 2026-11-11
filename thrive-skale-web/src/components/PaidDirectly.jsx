import { PAID_DIRECTLY } from '../utils/countryConfig';

const PaidDirectly = () => (
    <section id="paid-directly" className="section">
        <div className="container">
            <div className="section-head">
                <h2>What you pay directly</h2>
                <p>These costs go straight to the provider, not to us. We help you set them up.</p>
            </div>

            <div className="table-wrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Rough cost</th>
                            <th scope="col">Paid to</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PAID_DIRECTLY.map((row) => (
                            <tr key={row.item}>
                                <th scope="row">{row.item}</th>
                                <td>{row.cost}</td>
                                <td className="muted">{row.paidTo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
);

export default PaidDirectly;
