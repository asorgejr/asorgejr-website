

const tableHeadStyle = "bg-gray-300 border text-left font-normal px-4 py-2"
const tableElemStyle = "border px-4 py-2"

export function SkillsTable() {
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


interface GridItemProps {
  svg: string;
  category: string;
  content: string;
}
function GridItem(props: GridItemProps) {
  return (
    <div className="flex flex-col justify-center mr-8 lg:mr-0">
      <div className="h-4" />
      <img src={props.svg} alt={props.category} className="h-8 w-8 relative left-0" />
      <div className="h-4" />
      <h3 className="text-lg font-light tracking-tighter leading-tight md:pr-8 text-black">
        {props.category}
      </h3>
      <div className="h-4" />
      <ul className="list-disc list-inside">
        {props.content}
      </ul>
    </div>
  )
}


export function SkillsGrid() {
  return (
    <div className="grid xl:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div className="row-span-2">
        <GridItem svg="/assets/vectors/coding.svg"
                  category="Languages"
                  content={
                    "C#, C++, JavaScript, TypeScript, Python, Rust, HTML, CSS, SQL"
                  }
        />
      </div>
      <div className="row-span-2">
        <GridItem svg="/assets/vectors/framework.svg"
                  category="Frameworks"
                  content={
                    "React, Next.js, Angular, .NET, Node.js"
                  }
        />
      </div>
      <div className="row-span-2">
        <GridItem svg="/assets/vectors/database.svg"
                  category="Databases"
                  content={
                    "MySQL, SQLite, MongoDB, DynamoDB"
                  }
        />
      </div>
      <div className="row-span-2">
        <GridItem svg="/assets/vectors/cloud.svg"
                  category="Cloud Infrastructure"
                  content={
                    "AWS, GCP"
                  }
        />
      </div>
      <div className="row-span-2">
        <GridItem svg="/assets/vectors/support.svg"
                  category="Tools"
                  content={
                    "Git, Docker, Unity, Unreal Engine, Photoshop, Illustrator, Blender, Houdini FX"
                  }
        />
      </div>
    </div>
  )
}
