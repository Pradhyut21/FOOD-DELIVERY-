export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Customer',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Priya Verma',
      role: 'Restaurant Owner',
      status: 'Blocked'
    }
  ];

  return (
    <div>
      <h1 className="text-xl mb-6">
        Users & Support
      </h1>

      <div
        className="card"
        style={{ padding: 0, overflow: 'hidden' }}
      >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.role}</td>

                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}