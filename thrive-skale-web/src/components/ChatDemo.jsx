import { useState } from 'react';
import Icon from './Icon';
import './ChatDemo.css';

/*
 * A sample WhatsApp-style conversation, built in HTML/CSS.
 * Messages are always in the layout (no layout shift); CSS animations only fade
 * and slide them in, once, on load. With reduced motion the final state shows.
 */
const ChatDemo = () => {
    const [run, setRun] = useState(0);
    return (
    <figure className="chat" aria-label="Sample WhatsApp conversation">
        <div className="chat-top">
            <span className="chat-avatar" aria-hidden="true">YB</span>
            <div>
                <p className="chat-name">Your Business</p>
                <p className="chat-status">Sample chat</p>
            </div>
            <button type="button" className="chat-replay" onClick={() => setRun((n) => n + 1)}>
                <Icon name="replay" size={18} />
                <span>Replay</span>
            </button>
        </div>

        <ol className="chat-body" key={run}>
            <li className="chat-msg chat-msg--in" style={{ '--d': '0.4s' }}>
                Hi, I saw your ad. Can I get a price for your service?
                <time>10:02</time>
            </li>
            <li className="chat-slot">
                <span className="chat-typing" aria-hidden="true"><i /><i /><i /></span>
                <p className="chat-msg chat-msg--out" style={{ '--d': '2.6s' }}>
                    Hi! Thanks for your message. Here is our price list.
                    <time>10:02</time>
                </p>
            </li>
            <li className="chat-msg chat-msg--out" style={{ '--d': '3.8s' }}>
                Would you like to book a call? Pick a time that suits you.
                <span className="chat-actions" aria-hidden="true">
                    <span>See prices</span>
                    <span>Book a call</span>
                </span>
                <time>10:02</time>
            </li>
            <li className="chat-note" style={{ '--d': '5.2s' }}>
                New lead saved in your CRM. Your team has been alerted.
            </li>
        </ol>

        <figcaption className="visually-hidden">
            A customer asks for a price after seeing an ad. An automatic reply sends the price list
            and offers to book a call. The lead is saved in the CRM and the team is alerted.
        </figcaption>
    </figure>
    );
};

export default ChatDemo;
