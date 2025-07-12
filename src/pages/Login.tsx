


export const Login = () => {
    return <div className="h-screen bg-blue-100 p-4 overflow-y-auto">
  <h2 className="text-2xl font-bold mb-2">h-screen</h2>
  <p>This container is fixed to the height of the screen.</p>
  <div className="mt-4 space-y-4">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="bg-white p-4 shadow rounded">
        Box #{i + 1}
      </div>
    ))}
  </div>
</div>

}
