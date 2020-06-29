exports.seed = function(knex) {
    return knex('educations').insert([
        { name: 'Aabenraa Statsskole', start_year: '2011'},
        { name: 'Silkeborg Højskole', start_year: '2017'}
    ]);
};