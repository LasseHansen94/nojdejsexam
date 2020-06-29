const { Model } = require('objection');

class Education extends Model {
    static tableName = 'educations';
}

module.exports = Education;