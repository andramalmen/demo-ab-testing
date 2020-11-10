import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getCookie, formatCookie } from '../utils/helper';
import React from 'react';

const Home = ({ group }) => {
    const [gr, setGr] = React.useState(() => group || 'A');

    const setGroup = g => {
        setGr(g);
        window.document.cookie = `group=${g}`;
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>POC Groups</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Demo A/B Testing</h1>
                <h2>You are in group {gr}</h2>
                <button onClick={() => setGroup('A')}>Force group A</button>
                <button onClick={() => setGroup('B')}>Force group B</button>

                <div className={styles.grid}>
                    {gr === 'A' && (
                        <div className={`${styles.card} ${styles.bgBlue}`}>
                            <h3>Group A</h3>
                            <p>Is blue ☹️</p>
                        </div>
                    )}

                    {gr === 'B' && (
                        <div className={`${styles.card} ${styles.bgPink}`}>
                            <h3>Group B</h3>
                            <p>Is pink 🚀</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

Home.getInitialProps = ({ req, res }) => {
    let group = getCookie(req.headers.cookie, 'group');
    if (!group || !['A', 'B'].includes(group)) {
        const random = Math.floor(Math.random() * 10);
        let newGroup = 'A';
        if (random >= 5) {
            newGroup = 'B';
        }
        const cookie = formatCookie('group', newGroup);
        group = newGroup;
        res.setHeader('set-cookie', [`group=${newGroup}`]);
    }
    return { group };
};

export default Home;
