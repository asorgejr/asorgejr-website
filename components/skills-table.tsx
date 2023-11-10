

const tableHeadStyle = "bg-gray-300 border text-left font-normal px-4 py-2"
const tableElemStyle = "border px-4 py-2"

export default function SkillsTable() {
  return (
    <table className="table-auto">
      <thead>
      <tr>
        <th className={tableHeadStyle}>Category</th>
        <th className={tableHeadStyle}>Skills</th>
      </tr>
      </thead>
      <tbody>
      <tr className="bg-gray-100">
        <td className={tableElemStyle}>Languages</td>
        <td className={tableElemStyle}>
          C#,
          C++,
          JavaScript,
          TypeScript,
          Python,
          Rust,
          HTML,
          CSS,
          SQL
        </td>
      </tr>
      <tr className="bg-gray-200">
        <td className={tableElemStyle}>Frameworks</td>
        <td className={tableElemStyle}>
          React,
          Next.js,
          Angular,
          .NET,
          Node.js,
        </td>
      </tr>
      <tr className="bg-gray-100">
        <td className={tableElemStyle}>Databases</td>
        <td className={tableElemStyle}>
          MySQL,
          SQLite,
          MongoDB,
          DynamoDB
        </td>
      </tr>
      <tr className="bg-gray-200">
        <td className={tableElemStyle}>Cloud Infrastructure</td>
        <td className={tableElemStyle}>
          AWS,
          GCP
        </td>
      </tr>
      <tr className="bg-gray-100">
        <td className={tableElemStyle}>Tools</td>
        <td className={tableElemStyle}>
          Git,
          Docker,
          Unity,
          Unreal Engine,
          Photoshop,
          Illustrator,
          Blender,
          Houdini FX
        </td>
      </tr>
      </tbody>
    </table>
  )
}