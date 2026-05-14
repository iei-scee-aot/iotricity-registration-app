import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Users2,
  FolderKanban,
  Settings,
  FileText,
  LogOut,
  Search,
  Bell,
  MessageSquare,
  MoreVertical,
  Edit2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

const MOCK_DATA = {
  stats: {
    totalUsers: '1,245',
    activeTeams: '84',
    totalProjects: '42',
    pendingPayments: '15'
  },
  users: [
    { id: 'U1001', name: 'Sarah Chen', email: 'sarah.c@university.edu', role: 'Participant', status: 'Active', payment: 'Paid', team: 'Gamma Force', lastActive: '2m ago' },
    { id: 'U1002', name: 'David Miller', email: 'dmiller@student.edu', role: 'Participant', status: 'Active', payment: 'Pending', team: 'Alpha Squad', lastActive: '15m ago' },
    { id: 'U1003', name: 'Elena Rodriguez', email: 'elena.r@college.edu', role: 'Mentor', status: 'Active', payment: 'N/A', team: 'N/A', lastActive: '1h ago' },
    { id: 'U1004', name: 'James Wilson', email: 'jwilson@university.edu', role: 'Participant', status: 'Inactive', payment: 'Unpaid', team: 'Beta Testers', lastActive: '2d ago' },
    { id: 'U1005', name: 'Aisha Patel', email: 'apatel@student.edu', role: 'Participant', status: 'Active', payment: 'Paid', team: 'Gamma Force', lastActive: '5m ago' },
    { id: 'U1006', name: 'Michael Chang', email: 'mchang@college.edu', role: 'Participant', status: 'Active', payment: 'Paid', team: 'Alpha Squad', lastActive: '10m ago' },
    { id: 'U1007', name: 'Emma Watson', email: 'ewatson@university.edu', role: 'Participant', status: 'Active', payment: 'Pending', team: 'Beta Testers', lastActive: '30m ago' }
  ],
  teams: [
    { id: 'T001', name: 'Gamma Force', lead: 'Sarah Chen', members: 4, status: 'Registered', projectIdea: 'AI Study Assistant', createdAt: '12-Oct-2023' },
    { id: 'T002', name: 'Alpha Squad', lead: 'David Miller', members: 3, status: 'Registered', projectIdea: 'Campus Navigation App', createdAt: '14-Oct-2023' },
    { id: 'T003', name: 'Beta Testers', lead: 'Emma Watson', members: 5, status: 'Pending Approval', projectIdea: 'Sustainable Energy Tracker', createdAt: '15-Oct-2023' },
    { id: 'T004', name: 'Data Miners', lead: 'Lucas Wright', members: 4, status: 'Registered', projectIdea: 'Predictive Attendance Model', createdAt: '18-Oct-2023' }
  ],
  projects: [
    { id: 'P001', title: 'StudyBuddy AI', team: 'Gamma Force', track: 'EdTech', status: 'In Progress', repoLink: 'github.com/gamma/studybuddy' },
    { id: 'P002', title: 'NavCampus', team: 'Alpha Squad', track: 'Utility', status: 'Submitted', repoLink: 'github.com/alpha/navcampus' },
    { id: 'P003', title: 'EcoTrack', team: 'Beta Testers', track: 'Sustainability', status: 'Planning', repoLink: 'github.com/beta/ecotrack' }
  ]
};

const StatusBadge = ({ status, type = 'default' }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'paid':
      case 'registered':
      case 'submitted':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'inactive':
      case 'unpaid':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'pending':
      case 'pending approval':
      case 'planning':
      case 'in progress':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'mentor':
      case 'admin':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'participant':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'n/a':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

const ActionButtons = ({ onEdit, onView }) => (
  <div className="flex space-x-2">
    <button onClick={onEdit} className="p-1 text-gray-400 hover:text-indigo-400 transition-colors" title="Edit">
      <Edit2 size={16} />
    </button>
    <button onClick={onView} className="p-1 text-gray-400 hover:text-gray-200 transition-colors" title="View Details">
      <Eye size={16} />
    </button>
  </div>
);

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1a1b1e] rounded-xl border border-gray-800 p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-400 mb-1">Total Users</div>
          <div className="text-3xl font-bold text-gray-100">{MOCK_DATA.stats.totalUsers}</div>
          <div className="text-sm text-emerald-400 flex items-center mt-2">
            <span className="font-medium">+12%</span> <span className="text-gray-500 ml-1">from last week</span>
          </div>
        </div>
        <div className="bg-[#1a1b1e] rounded-xl border border-gray-800 p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-400 mb-1">Active Teams</div>
          <div className="text-3xl font-bold text-gray-100">{MOCK_DATA.stats.activeTeams}</div>
          <div className="text-sm text-emerald-400 flex items-center mt-2">
            <span className="font-medium">+5%</span> <span className="text-gray-500 ml-1">from last week</span>
          </div>
        </div>
        <div className="bg-[#1a1b1e] rounded-xl border border-gray-800 p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-400 mb-1">Total Projects</div>
          <div className="text-3xl font-bold text-gray-100">{MOCK_DATA.stats.totalProjects}</div>
        </div>
        <div className="bg-[#1a1b1e] rounded-xl border border-gray-800 p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-400 mb-1">Pending Payments (Offline)</div>
          <div className="text-3xl font-bold text-amber-500">{MOCK_DATA.stats.pendingPayments}</div>
          <div className="text-sm text-gray-500 mt-2">Requires attention</div>
        </div>
      </div>

      {/* Chart Placeholder & Recent Activity Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1a1b1e] rounded-xl border border-gray-800 shadow-sm p-5">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Registration Trends</h3>
          {/* Simple CSS-based bar chart placeholder */}
          <div className="h-64 flex items-end space-x-2 sm:space-x-4 pt-4 border-b border-l border-gray-700 pb-2 pl-2">
            {[40, 60, 45, 80, 100, 120, 90].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group relative">
                <div 
                  className="w-full bg-indigo-500/80 rounded-t-sm transition-all duration-300 hover:bg-indigo-400"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">Day {i+1}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1b1e] rounded-xl border border-gray-800 shadow-sm p-5">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { text: 'Sarah Chen registered for the hackathon', time: '10m ago', icon: <Users size={16} className="text-blue-400"/> },
              { text: 'Team "Alpha Squad" formed', time: '1h ago', icon: <Users2 size={16} className="text-emerald-400"/> },
              { text: 'Offline payment received from David M.', time: '2h ago', icon: <CheckCircle2 size={16} className="text-emerald-400"/> },
              { text: 'New project "StudyBuddy" submitted', time: '5h ago', icon: <FolderKanban size={16} className="text-purple-400"/> }
            ].map((activity, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="mt-0.5 p-1.5 rounded-full bg-gray-800 border border-gray-700">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-300">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(MOCK_DATA.users);
  
  const handleVerifyPayment = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, payment: 'Paid' } : u
    ));
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.team.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="bg-[#1a1b1e] rounded-xl border border-gray-800 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      <div className="p-4 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-200">All Users</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-10 pr-4 py-2 bg-[#25262b] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-200 placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#25262b] text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
              <th className="px-6 py-3 font-medium">User Details</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Team</th>
              <th className="px-6 py-3 font-medium">Payment Status</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#25262b] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mr-3 border border-indigo-500/20">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-200">{user.name}</div>
                      <div className="text-gray-500 text-xs">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"><StatusBadge status={user.role} /></td>
                <td className="px-6 py-4 text-gray-300">{user.team}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={user.payment} />
                    {user.payment === 'Pending' && (
                      <button 
                        className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
                        onClick={() => handleVerifyPayment(user.id)}
                      >
                        Verify Offline
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4"><StatusBadge status={user.status} /></td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end">
                    <ActionButtons 
                      onEdit={() => console.log('Edit', user.id)} 
                      onView={() => console.log('View', user.id)} 
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-800 flex items-center justify-between text-sm text-gray-500 bg-[#1a1b1e]">
        <div>Showing 1 to {filteredUsers.length} of {users.length} entries</div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border border-gray-700 rounded hover:bg-[#25262b] text-gray-400">Previous</button>
          <button className="px-3 py-1 border border-indigo-500 bg-indigo-500/10 text-indigo-400 rounded">1</button>
          <button className="px-3 py-1 border border-gray-700 rounded hover:bg-[#25262b] text-gray-400">Next</button>
        </div>
      </div>
    </div>
  );
};

const TeamsList = () => {
  return (
    <div className="bg-[#1a1b1e] rounded-xl border border-gray-800 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-200">Teams</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors shadow-sm">
          Create Team
        </button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#25262b] text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
              <th className="px-6 py-3 font-medium">Team Name</th>
              <th className="px-6 py-3 font-medium">Lead</th>
              <th className="px-6 py-3 font-medium">Members</th>
              <th className="px-6 py-3 font-medium">Project Idea</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {MOCK_DATA.teams.map((team) => (
              <tr key={team.id} className="hover:bg-[#25262b] transition-colors">
                <td className="px-6 py-4 font-medium text-gray-200">{team.name}</td>
                <td className="px-6 py-4 text-gray-300">{team.lead}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <Users2 size={16} className="text-gray-500" />
                    <span className="text-gray-300">{team.members}/5</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 truncate max-w-xs" title={team.projectIdea}>{team.projectIdea}</td>
                <td className="px-6 py-4"><StatusBadge status={team.status} /></td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end">
                    <ActionButtons onEdit={() => {}} onView={() => {}} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProjectsList = () => {
  return (
    <div className="bg-[#1a1b1e] rounded-xl border border-gray-800 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-200">Projects</h2>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#25262b] text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
              <th className="px-6 py-3 font-medium">Project Title</th>
              <th className="px-6 py-3 font-medium">Team</th>
              <th className="px-6 py-3 font-medium">Track</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Repo Link</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {MOCK_DATA.projects.map((project) => (
              <tr key={project.id} className="hover:bg-[#25262b] transition-colors">
                <td className="px-6 py-4 font-medium text-gray-200">{project.title}</td>
                <td className="px-6 py-4 text-gray-300">{project.team}</td>
                <td className="px-6 py-4 text-gray-400">{project.track}</td>
                <td className="px-6 py-4"><StatusBadge status={project.status} /></td>
                <td className="px-6 py-4 text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer">{project.repoLink}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end">
                    <ActionButtons onEdit={() => {}} onView={() => {}} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'users', label: 'Users Management', icon: <Users size={20} /> },
    { id: 'teams', label: 'Teams', icon: <Users2 size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'users': return <UsersList />;
      case 'teams': return <TeamsList />;
      case 'projects': return <ProjectsList />;
      default: return (
        <div className="flex items-center justify-center h-full text-gray-500">
          Content for {activeTab} is under construction.
        </div>
      );
    }
  };

  const getPageTitle = () => {
    return navItems.find(item => item.id === activeTab)?.label || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-200 font-sans overflow-hidden">
      
      {/* Mobile overlay */}
      {!isSidebarOpen && window.innerWidth < 1024 && (
         <div 
           className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm" 
           onClick={() => setIsSidebarOpen(false)}
         />
      )}

      {/* Sidebar - Dark Mode Optimized */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#111215] border-r border-gray-800 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 flex flex-col`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-800 bg-[#111215]">
          <div className="flex items-center space-x-3 text-white font-bold text-lg">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white text-xl">H</span>
            </div>
            <span className="tracking-wide">HackAdmin</span>
          </div>
          {/* Mobile close button */}
          <button 
            className="ml-auto lg:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
                    : 'text-gray-400 hover:bg-[#25262b] hover:text-gray-200'
                }`}
              >
                <span className={`transition-colors ${isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
                
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 h-8 w-1 bg-indigo-500 rounded-r-full" />
                )}
              </button>
            )
          })}
          
          <div className="pt-6 mt-6 border-t border-gray-800">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#25262b] hover:text-gray-200 transition-all duration-200 group">
              <FileText size={20} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
              <span className="text-sm">Reports</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800 bg-[#0d0e11]">
          <div className="flex items-center space-x-3 px-2 py-1">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
              AC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">Alex Carter</p>
              <p className="text-xs text-gray-500 truncate">Super Admin</p>
            </div>
            <button className="text-gray-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-gray-800">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
        {/* Top Header */}
        <header className="h-16 bg-[#1a1b1e] border-b border-gray-800 flex items-center justify-between px-4 sm:px-6 z-10 shadow-sm">
          <div className="flex items-center">
            <button 
              className="lg:hidden text-gray-400 hover:text-gray-200 mr-4 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-100 hidden sm:block">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="w-full pl-10 pr-4 py-2 bg-[#25262b] border border-transparent rounded-lg focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500 text-sm transition-all text-gray-200 placeholder-gray-500 outline-none"
              />
            </div>
            
            <button className="relative p-2 text-gray-400 hover:bg-[#25262b] hover:text-gray-200 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border border-[#1a1b1e]"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}