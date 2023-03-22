import http from "../http-common";

class WalletsDataService {
  getAll() {
    return http.get("/wallets");
  }

  get(id) {
    return http.get(`/wallets/${id}`);
  }

  create(data) {
    return http.post("/wallets", data);
  }

  update(id, data) {
    return http.put(`/wallets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/wallets/${id}`);
  }

  deleteAll() {
    return http.delete(`/wallets`);
  }

  findByWallet(wallet) {
    return http.get(`/wallets?wallet=${wallet}`);
  }
}

export default new WalletsDataService();