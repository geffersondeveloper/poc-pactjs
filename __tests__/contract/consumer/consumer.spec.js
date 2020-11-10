import 'dotenv/config';

import { Pact } from '@pact-foundation/pact';
import { eachLike, somethingLike, integer, string, boolean } from '@pact-foundation/pact/dsl/matchers';
import path from 'path';
import { expect } from 'chai'

import { consultaUsuarios } from '../../../src/service/api'

const EXPECTED_BODY = [{"id":"cbefb970-fdbf-4648-93ae-860556d5be7d","nome":"Gefferson Oliveira","email":"gefferson.adriano@cvortex.io","idade":21,"usuarioAtivado":true},{"id":"d21801d3-3e44-46df-a84e-0c566a769726","nome":"Brenda Garcia","email":"brenda.garcia@cvortex.io","idade":21,"usuarioAtivado":false}]

const mockProvider = new Pact({
  consumer: 'web-client',
  provider: 'cvortex-users-api',
  port: 4000,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'WARN',
  spec: 2,
  cors: true
})

describe('Teste API - cvortex-users-api', () => {
  beforeAll(async () => 
    await mockProvider.setup().then(() => {
      mockProvider.addInteraction({
        uponReceiving: 'listar todos os usuários',
        withRequest: {
          method: 'GET',
          path: '/370c18ef-2806-4910-b1ee-0a70a526fb2d'
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: EXPECTED_BODY
        }
      })
    })
  )



  it('deve retornar dados corretos dos usuario na lista', async () => {
    const response = await consultaUsuarios();

    const { id, nome, email, idade, usuarioAtivado } = response.data[0];

    expect(response.status).to.equal(200)
    expect(id).to.be.a('string')
    expect(nome).to.equal('Gefferson Oliveira')
    expect(email).to.equal('gefferson.adriano@cvortex.io')
    expect(idade).to.equal(21)
    expect(usuarioAtivado).to.equal(true)

  })

  afterEach(() => mockProvider.verify())

  afterAll(() => mockProvider.finalize())
})