export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-xl mb-6">
        Platform Settings
      </h1>

      <div
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}
      >
        <div>
          <label>Commission (%)</label>

          <input
            className="input"
            type="number"
            defaultValue="18"
          />
        </div>

        <div>
          <label>Support Email</label>

          <input
            className="input"
            defaultValue="support@cravemate.com"
          />
        </div>

        <button
          className="btn btn-primary"
          style={{ width: 200 }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}