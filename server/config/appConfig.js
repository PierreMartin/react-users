function defaultExport() {}

defaultExport.DB_TYPE = process.env.DB_TYPE || 'MONGO'; // ICI si on veux changer le SDGDBDD
defaultExport.ENV = process.env.NODE_ENV || 'development';

module.exports = defaultExport;
