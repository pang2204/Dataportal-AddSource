import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import EditResourceContainer from './../../containers/EditResource'

describe('<EditResourceContainer />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should set state type of database resource when call API properly', (done) => {
    const match = {
      params: { id: 0 },
    }
    const wrapper = shallow(<EditResourceContainer match={match} />)
    wrapper.setState({
      name: 'AccountName',
      type: 'Database',
      columns: [
        'accountName,String',
        'status,string',
      ],
      description: 'Account name',
      tags: ['athena'],
    })
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          name: 'AccountName',
          type: 'Database',
          columns: [
            'accountName,String',
            'status,string',
          ],
          description: 'Account name',
          tags: ['athena'],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/resources/0/')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('AccountName')
        expect(wrapper.state().columns).toEqual(['accountName,String', 'status,string'])
        expect(wrapper.state().type).toBe('Database')
        expect(wrapper.state().description).toBe('Account name')
        expect(wrapper.state().tags).toEqual(['athena'])
        done()
      })
    })
  })

  it('should set state type of superset resource when call API properly', (done) => {
    const match = {
      params: { id: 0 },
    }
    const wrapper = shallow(<EditResourceContainer match={match} />)
    wrapper.setState({
      name: 'pw_accounts_account',
      type: 'Superset Dashboard',
      url: 'https://www.prontotools.io/',
      tags: ['athena'],
    })
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          name: 'pw_accounts_account',
          type: 'Superset Dashboard',
          url: 'https://www.prontotools.io/',
          tags: ['athena'],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/resources/0/')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('pw_accounts_account')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/')
        expect(wrapper.state().type).toBe('Superset Dashboard')
        expect(wrapper.state().tags).toEqual(['athena'])
        done()
      })
    })
  })

  it('should set state type of knowledge post resource when call API properly', (done) => {
    const match = {
      params: { id: 0 },
    }
    const wrapper = shallow(<EditResourceContainer match={match} />)
    wrapper.setState({
      name: 'Robot Framework',
      type: 'Knowledge Post',
      url: 'https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/',
      tags: ['automate', 'testing'],
    })
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          name: 'Robot Framework',
          type: 'Knowledge Post',
          url: 'https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/',
          tags: ['automate', 'testing'],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/resources/0/')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('Robot Framework')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/')
        expect(wrapper.state().type).toBe('Knowledge Post')
        expect(wrapper.state().tags).toEqual(['automate', 'testing'])
        done()
      })
    })
  })
})
