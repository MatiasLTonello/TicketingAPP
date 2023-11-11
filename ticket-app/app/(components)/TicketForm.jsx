"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = () => {
  const router = useRouter()
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/Tickets', {
      method: 'POST',
      body: JSON.stringify({formData}),
      "content-type": "application/json"
    })
    if(!res.ok){
      throw new Error("Failed to create Ticket")
    }

    router.refresh()
    router.push('/')
  };

  const [formData, setFormData] = useState(startingTicketData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>Create Your Ticket</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
          <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />

        <label>Category</label>
        <select name='category' value={formData.category} onChange={handleSubmit}>
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>

        <label>Priority</label>
        <div>
          <input id='priority-1' name='priority' type='radio' onChange={handleChange} value={1} checked={formData.priority == 1}></input>
            <label>1</label>
        </div>
        <div>
          <input id='priority-2' name='priority' type='radio' onChange={handleChange} value={1} checked={formData.priority == 2}></input>
            <label>2</label>
        </div>
        <div>
          <input id='priority-3' name='priority' type='radio' onChange={handleChange} value={1} checked={formData.priority == 3}></input>
            <label>3</label>
        </div>
        <div>
          <input id='priority-4' name='priority' type='radio' onChange={handleChange} value={1} checked={formData.priority == 4}></input>
            <label>4</label>
        </div>
        <label>Progress</label>
        <input type='range' value={formData.progress} id='progress' name='progress' min={0} max={100} onChange={handleChange}></input>
        <label>Status</label>
        <select name='status' value={formData.status} onChange={handleChange}>
          <option value='not started'>not started</option>
          <option value='started'>started</option>
          <option value='done'>done</option>
        </select>
        <input type='submit' className='btn' value='Create Ticket'/>
      </form>
    </div>
  );
};

export default TicketForm;
