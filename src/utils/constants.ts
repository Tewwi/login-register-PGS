export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? '/api' : 'https://google.com';

export const ACCESS_TOKEN_KEY = 'token';

export const avatarDefault = 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';
