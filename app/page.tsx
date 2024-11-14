'use client'
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { addUser, findUser } from "@/lib/actions/users.action";

interface IFormData {
  firstname: string;
  lastname: string;
  email: string;
  pwd: string;
}

interface IUserData {
  uid : string | null
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  pwd: string | null;
}

const SimpleTable = ({ data } : {data: Array<IUserData>}) => {
  // Get headers from the first data item

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-200 p-2 text-left text-black text-sm">User ID</th>
            <th className="border border-gray-200 p-2 text-left  text-black text-sm">First Name</th>
            <th className="border border-gray-200 p-2 text-left  text-black text-sm">Last Name</th>
            <th className="border border-gray-200 p-2 text-left  text-black text-sm">Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.uid}>
              <td className="border border-gray-200 p-2 text-sm">{user.uid}</td>
              <td className="border border-gray-200 p-2 text-sm">{user.firstname}</td>
              <td className="border border-gray-200 p-2 text-sm">{user.lastname}</td>
              <td className="border border-gray-200 p-2 text-sm">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default function Home() {
  const [formData, setFormData] = useState<IFormData>({
    firstname: "",
    lastname: "",
    email: "",
    pwd: "",
  });
  const [selectedAttribute, setSelectedAttribute] = useState<string>("");
  const [attributeValue, setAttributeValue] = useState<string>("");
  const [searchUsers, setSearchUsers] = useState<Array<IUserData>>([])

  const handleChange = (e : ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e: FormEvent<HTMLFormElement>  ): Promise<void> => {
    e.preventDefault();
    try {
      await addUser(formData);
      alert("User added successfully!");
    } catch (err) {
      console.error("Error adding user: ", err);
      alert("Failed to add user: " + err);
    } finally {
      setFormData({firstname: "",
        lastname: "",
        email: "",
        pwd: ""})
    }
  };

  const handleAttributeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedAttribute(e.target.value);
  };

  const handleAtrributeValueChange = (e : ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setAttributeValue(value)
  };

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const foundUsers = await findUser(selectedAttribute, attributeValue);
      console.log(foundUsers)
      setSearchUsers(foundUsers)
    } catch (err) {
      console.error("Error finding user/s: ", err);
      alert("Failed to find user/s: " + err);
    } finally {
      setAttributeValue('')
    }
  }

  return (
    <div className="flex flex-row items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 rounded text-black required"
          required
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-2 rounded text-black"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded text-black required"
          required
        />
        <input
          type="password"
          name="pwd"
          value={formData.pwd}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 rounded text-black required"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>
      <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4 mt-4">
        <label htmlFor="attribute" className="font-medium">
            Select Attribute:
        </label>
        <select
            id="attribute"
            value={selectedAttribute}
            onChange={handleAttributeChange}
            className="border p-2 rounded text-black"
          >
            <option value="firstname">First Name</option>
            <option value="lastname">Last Name</option>
            <option value="email">Email</option>
            {/* <option value="pwd">Password</option> */}
        </select>
        <input
          type="text"
          value={attributeValue}
          onChange={handleAtrributeValueChange}
          placeholder="Enter User Attribute"
          className="border p-2 rounded text-black required"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search User
        </button>
      </form>
      <SimpleTable data={searchUsers}/>
    </div>
  );
}
