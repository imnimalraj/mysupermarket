import { useState, useEffect } from "react";
import { storeService } from "../../../services/api";
import "./Stores.css";

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStore, setEditingStore] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    userId: "",
    region: "",
    address: "",
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const data = await storeService.getAll();
      setStores(data);
    } catch (err) {
      console.error("Error fetching stores:", err);
      setError("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (store) => {
    setEditingStore(store);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await storeService.update(editingStore.id, editingStore);
      setShowEditModal(false);
      setEditingStore(null);
      fetchStores();
    } catch (err) {
      console.error("Error updating store:", err);
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await storeService.create(newStore);
      setShowAddModal(false);
      setNewStore({
        name: "",
        userId: "",
        region: "",
        address: "",
      });
      fetchStores();
    } catch (err) {
      console.error("Error adding store:", err);
    }
  };

  if (loading) return <div className="loading">Loading stores...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="stores-page">
      <div className="page-header">
        <h1>Stores</h1>
        <button className="action-button" onClick={() => setShowAddModal(true)}>
          Add Store
        </button>
      </div>

      <div className="cards-grid">
        {stores.map((store) => (
          <div key={store.id} className="store-card">
            <h3 className="store-name">{store.name}</h3>
            <div className="store-id">Store #{store.id}</div>

            <div className="info-item">
              <span className="info-label">Username:</span>
              <span className="info-value">{store.username}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Region:</span>
              <span className="info-value">{store.region}</span>
            </div>

            <div className="store-actions">
              <button
                className="action-button"
                onClick={() => handleEdit(store)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Store</h2>
              <button
                className="close-button"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddStore} className="edit-form">
              <div className="form-group">
                <label>Store Name</label>
                <input
                  type="text"
                  value={newStore.name}
                  onChange={(e) =>
                    setNewStore({ ...newStore, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>User ID</label>
                <input
                  type="text"
                  value={newStore.userId}
                  onChange={(e) =>
                    setNewStore({ ...newStore, userId: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Region</label>
                <input
                  type="text"
                  value={newStore.region}
                  onChange={(e) =>
                    setNewStore({ ...newStore, region: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={newStore.address}
                  onChange={(e) =>
                    setNewStore({ ...newStore, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Add Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Store</h2>
              <button
                className="close-button"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdate} className="edit-form">
              <div className="form-group">
                <label>Store Name</label>
                <input
                  type="text"
                  value={editingStore.name}
                  onChange={(e) =>
                    setEditingStore({ ...editingStore, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Region</label>
                <input
                  type="text"
                  value={editingStore.region}
                  onChange={(e) =>
                    setEditingStore({ ...editingStore, region: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={editingStore.address || ""}
                  onChange={(e) =>
                    setEditingStore({
                      ...editingStore,
                      address: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoresPage;
