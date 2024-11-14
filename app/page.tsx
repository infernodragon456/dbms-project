'use client'
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { addUser, findUser } from "@/lib/actions/users.action";

interface IFormData {
  firstname: string;
  lastname: string;
  email: string;
  pwd: string;
}

export default function Home() {
  const [formData, setFormData] = useState<IFormData>({
    firstname: "",
    lastname: "",
    email: "",
    pwd: "",
  });
  const [selectedAttribute, setSelectedAttribute] = useState<string>("");
  const [attributeValue, setAttributeValue] = useState<string>("");

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
  }

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
      <form>
        <label htmlFor="attribute" className="font-medium">
            Select Attribute:
        </label>
        <select
            id="attribute"
            value={selectedAttribute}
            onChange={handleAttributeChange}
            className="border p-2 rounded"
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
    </div>
  );
}
