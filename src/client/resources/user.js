export default {
  test (client, payload) {
    const { id } = payload
    return client.get(`todos/${id}`)
  }
}
