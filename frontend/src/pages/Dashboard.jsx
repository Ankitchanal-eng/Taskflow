import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Import the custom, authenticated Axios instance

export default function Dashboard() {
    // State for fetching/displaying tasks
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for the new task form
    const [newTaskData, setNewTaskData] = useState({
        title: '',
        status: 'Pending' // Default status
    });

    const navigate = useNavigate();

    // --- LOGOUT FUNCTION ---
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // --- FETCH TASKS ---
    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
            setLoading(false);
            setError(''); // Clear any previous errors
        } catch (err) {
            setError('Failed to fetch tasks. Please log in again.');
            setLoading(false);
            
            // Critical check: If the token is invalid or expired (401), force logout
            if (err.response && err.response.status === 401) {
                handleLogout();
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []); // Runs only once when the component mounts

    // --- NEW TASK FORM HANDLERS ---
    const onNewTaskChange = e => {
        setNewTaskData({ ...newTaskData, [e.target.name]: e.target.value });
    };

    const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskData.title.trim()) return; // Prevent empty title

    try {
        // --- CRITICAL CHANGE HERE ---
        // Explicitly destructure only the required data to be sent
        const { title, status } = newTaskData;
        
        // Send the POST request using the authenticated API instance
        const res = await api.post('/tasks', { title, status });
        // --- END CRITICAL CHANGE ---
        
        // Update the tasks list with the new task returned from the backend (prepend)
        setTasks([res.data, ...tasks]); 
        
        // Clear the form
        setNewTaskData({ title: '', status: 'Pending' });

    } catch (err) {
        setError('Failed to create task.');
        console.error('Task creation error:', err);
    }
};

    // --- RENDER LOGIC ---
    if (loading) {
        return <h1>Loading Tasks.....</h1>;
    }

    return (
        <div style={{ padding: '20px' }}>
            {/* Header and Logout Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
                <h1>Task Dashboard</h1>
                <button 
                    onClick={handleLogout} 
                    style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    Logout
                </button>
            </div>
            
            {/* Display Error Message */}
            {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
            
            {/* Create New Task Form */}
            <div style={{ marginTop: '0px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
                <h2>Create New Task</h2>
                <form onSubmit={handleCreateTask} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    <div style={{ flexGrow: 1 }}>
                        <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={newTaskData.title}
                            onChange={onNewTaskChange}
                            placeholder="Enter task title"
                            required
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="status" style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={newTaskData.status}
                            onChange={onNewTaskChange}
                            style={{ padding: '10px', border: '1px solid #ddd' }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Add Task
                    </button>
                </form>
            </div>


            {/* Display Existing Tasks */}
            <div style={{ marginTop: '20px' }}>
                <h2>Your Tasks ({tasks.length})</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {tasks.length === 0 ? (
                        <p>No tasks found. Get started above!</p>
                    ) : (
                        tasks.map(task => (
                            <div key={task._id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                                <h4>{task.title}</h4>
                                <p>Status: <strong>{task.status}</strong></p>
                                <p style={{ fontSize: '0.8em', color: '#666' }}>ID: {task._id}</p>
                                {/* We will add Edit/Delete functionality next */}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}