export default {
  test (client, { payload, config = {} }) {
    const { id } = payload
    return client.get(`todos/${id}`, config)
  }
}
