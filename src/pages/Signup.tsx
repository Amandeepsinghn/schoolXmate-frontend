

export const Signup = () => {
    return <div className="min-h-screen bg-green-100 p-4">
  <h2 className="text-2xl font-bold mb-2">min-h-screen</h2>
  <p>This container grows taller if the content overflows.</p>
  <div className="mt-4 space-y-4">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="bg-white p-4 shadow rounded">
        Box #{i + 1}
      </div>
    ))}
  </div>
</div>
}