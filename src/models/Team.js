const db = require('./db')

const session = db.session()

const Team = {
  createTeamhasMember: async (name, description, memberId) => {
    const team = await session.run('Create (t:Team{name:{name},description:{description}}', {
      name,
      description,
    })
    const teamId = team.records[0]._fields[0].properties.identity.low
    const teamHasMember = await session.run('MATCH (m:Member) WHERE ID(m) = {memberId} ' +
    'MATCH (t:Team) WHERE ID(t) = {teamId} ' +
    'CREATE n=(t)-[r:hasMember]->(m) RETURN n', {
      memberId,
      teamId,
    })
    return teamHasMember
  },

  getTeam: async () => {
    const teams = await session.run('MATCH n=(t:Team)-[r:hasMember]->(m:Member) RETURN n ')
    return teams
  },

  deleteTeam: async (teamId) => {
    await session.run('MATCH p=(t:Team)-[r:hasMember]->(m:Member) ' +
    'WHERE ID(t) = {teamId} DELETE r', {
      teamId,
    })
    await session.run('MATCH (t:Team) WHERE ID(t) = 13 DELETE t')
  },

  setTeam: async (teamId, name, description, memberId) => {
    await session.run('MATCH p=(t:Team)-[r:hasMember]->(m:Member) ' +
    'WHERE ID(t) = {teamId} DELETE r', {
      teamId,
    })
    const team = await session.run('MATCH (m:Member) WHERE ID(m) = {memberId} ' +
    'MATCH (t:Team) WHERE ID(t) = {teamId} ' +
    'CREATE n=(t)-[r:hasMember]->(m) RETURN n', {
      memberId,
      teamId,
    })
    return team
  },


}

module.exports = Team
