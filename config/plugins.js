module.exports = {
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 250mb in bytes
    },
  },
};