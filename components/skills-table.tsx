

const kTableHeadStyle = "bg-gray-300 border text-left font-normal px-4 py-2"
const kTableElemStyle = "border px-4 py-2"

const kLanguages = "C#, C++, JavaScript, TypeScript, Python, Rust, HTML, CSS, SQL";
const kFrameworks = "React, Next.js, Angular, .NET, Node.js";
const kDatabases = "MySQL, SQLite, MongoDB, DynamoDB";
const kCloudInfrastructure = "AWS, GCP";
const kTools = "Git, Docker, Unity, Unreal Engine, Photoshop, Illustrator, Blender, Houdini FX";

export function SkillsTable() {
  return (
    <table className="table-auto">
      <thead>
      <tr>
        <th className={kTableHeadStyle}>Category</th>
        <th className={kTableHeadStyle}>Skills</th>
      </tr>
      </thead>
      <tbody>
      <tr className="bg-gray-100">
        <td className={kTableElemStyle}>Languages</td>
        <td className={kTableElemStyle}>
          {kLanguages}
        </td>
      </tr>
      <tr className="bg-gray-200">
        <td className={kTableElemStyle}>Frameworks</td>
        <td className={kTableElemStyle}>
          {kFrameworks}
        </td>
      </tr>
      <tr className="bg-gray-100">
        <td className={kTableElemStyle}>Databases</td>
        <td className={kTableElemStyle}>
          {kDatabases}
        </td>
      </tr>
      <tr className="bg-gray-200">
        <td className={kTableElemStyle}>Cloud Infrastructure</td>
        <td className={kTableElemStyle}>
          {kCloudInfrastructure}
        </td>
      </tr>
      <tr className="bg-gray-100">
        <td className={kTableElemStyle}>Tools</td>
        <td className={kTableElemStyle}>
          {kTools}
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
    <div className="flex xl:flex-col flex-row mr-2">
      <div className="flex flex-col justify-center mr-8 left-0 flex-shrink-0">
        <img src={props.svg} alt={props.category} className="h-8 w-8" />
      </div>
      <div className="flex flex-col lg:mr-0 mr-8 xl:mt-4 mt-0">
        <h3 className="text-lg font-light tracking-tighter leading-tight md:pr-8 text-black">
          {props.category}
        </h3>
        <div className="h-2" />
        <p>
          {props.content}
        </p>
      </div>
    </div>
  )
}


export function SkillsGrid() {
  return (
    <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-6">
      <div className="row-span-2">
        <GridItem svg="/assets/vectors/coding.svg"
                  category="Languages"
                  content={kLanguages}
        />
      </div>
      <div className="row-span-2">
        <GridItem svg="/assets/vectors/framework.svg"
                  category="Frameworks"
                  content={kFrameworks}
        />
      </div>
      <div className="row-span-2">
        <GridItem svg="/assets/vectors/database.svg"
                  category="Databases"
                  content={kDatabases}
        />
      </div>
      <div className="row-span-2">
        <GridItem svg="/assets/vectors/cloud.svg"
                  category="Cloud Infrastructure"
                  content={kCloudInfrastructure}
        />
      </div>
      <div className="row-span-2">
        <GridItem svg="/assets/vectors/support1.svg"
                  category="Tools"
                  content={kTools}
        />
      </div>
    </div>
  )
}
