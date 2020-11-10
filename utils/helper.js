export const getCookie = (cookie, cookieName) => {
    if (!cookie) {
        return;
    }
    const cookieVals = cookie.split(/;\s*/);
    for (const i in cookieVals) {
        const cookie = cookieVals[i].split('=');
        const name = unescape(cookie[0]);
        if (name === cookieName) {
            return unescape(cookie[1]);
        }
    }

    return undefined;
};

export const formatCookie = (key, value, options) => {
    if (!options) {
        options = {};
    }
    const s = `${escape(key)}=${escape(value)}`;
    if (options.expires) s += `; expires=' + ${options.expires}`;
    if (options.path) s += `; path=' + ${escape(options.path)}`;
    if (options.domain) s += `; domain=' + ${escape(options.domain)}`;
    if (options.secure) s += '; secure';
    return s;
};

export const isServer = () => typeof window === 'undefined';
