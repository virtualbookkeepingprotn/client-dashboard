import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend } from 'recharts';

const CLIENT_ACCESS = {
  'mako2025': { name: 'Mako Shade', role: 'owner' },
  'accountant123': { name: 'Accountant View', role: 'accountant' },
};

const LoginScreen = ({ onLogin, error }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin(password);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))', borderRadius: '24px', padding: '48px', border: '1px solid rgba(148, 163, 184, 0.1)', width: '100%', maxWidth: '420px', boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 auto 20px' }}>MS</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#e2e8f0', margin: '0 0 8px 0' }}>Mako Shade</h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Financial Dashboard</p>
        </div>
        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Access Code</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} placeholder="Enter your access code" style={{ width: '100%', padding: '16px 20px', fontSize: '15px', background: 'rgba(15, 23, 42, 0.6)', border: error ? '2px solid #ef4444' : '2px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', color: '#e2e8f0', outline: 'none', boxSizing: 'border-box' }} />
          {error && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>Invalid access code. Please try again.</p>}
          <button onClick={handleSubmit} disabled={isLoading || !password} style={{ width: '100%', padding: '16px', marginTop: '20px', fontSize: '15px', fontWeight: '600', background: isLoading || !password ? 'rgba(148, 163, 184, 0.2)' : 'linear-gradient(135deg, #06b6d4, #10b981)', border: 'none', borderRadius: '12px', color: isLoading || !password ? '#64748b' : '#0f172a', cursor: isLoading || !password ? 'not-allowed' : 'pointer' }}>{isLoading ? 'Verifying...' : 'Access Dashboard'}</button>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogin = (password) => {
    if (CLIENT_ACCESS[password]) {
      setIsAuthenticated(true);
      setCurrentUser(CLIENT_ACCESS[password]);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} error={loginError} />;
  }

  const monthlyData = [
    { month: 'Jan', revenue: 31969, cogs: 22748, grossProfit: 9221, expenses: 7324, netIncome: 1924 },
    { month: 'Feb', revenue: 56977, cogs: 34474, grossProfit: 22503, expenses: 12045, netIncome: 9579 },
    { month: 'Mar', revenue: 81320, cogs: 57473, grossProfit: 23847, expenses: 8273, netIncome: 14077 },
    { month: 'Apr', revenue: 60231, cogs: 23939, grossProfit: 36292, expenses: 13374, netIncome: 22229 },
    { month: 'May', revenue: 40310, cogs: 30135, grossProfit: 10175, expenses: 18602, netIncome: -9087 },
    { month: 'Jun', revenue: 36954, cogs: 21327, grossProfit: 15627, expenses: 20867, netIncome: -5593 },
    { month: 'Jul', revenue: 51504, cogs: 34223, grossProfit: 17281, expenses: 20757, netIncome: -707 },
    { month: 'Aug', revenue: 62896, cogs: 32290, grossProfit: 30606, expenses: 27210, netIncome: 1477 },
    { month: 'Sep', revenue: 41366, cogs: 21054, grossProfit: 20313, expenses: 18377, netIncome: -2694 },
    { month: 'Oct', revenue: 56501, cogs: 25022, grossProfit: 31479, expenses: 13977, netIncome: 12941 },
  ];

  const balanceSheetData = [
    { month: 'Jan', assets: 17534, liabilities: 0, equity: 17534, cash: 17534 },
    { month: 'Feb', assets: 14713, liabilities: 0, equity: 14713, cash: 14713 },
    { month: 'Mar', assets: 12041, liabilities: 0, equity: 12041, cash: 12041 },
    { month: 'Apr', assets: 51024, liabilities: 23705, equity: 27320, cash: 25462 },
    { month: 'May', assets: 37611, liabilities: 23126, equity: 14485, cash: 12049 },
    { month: 'Jun', assets: 30618, liabilities: 23126, equity: 7492, cash: 5056 },
    { month: 'Jul', assets: 28387, liabilities: 22548, equity: 5840, cash: 2825 },
    { month: 'Aug', assets: 28246, liabilities: 21970, equity: 6277, cash: 2684 },
    { month: 'Sep', assets: 25373, liabilities: 21970, equity: 3403, cash: -370 },
    { month: 'Oct', assets: 37354, liabilities: 21970, equity: 15384, cash: 11611 },
  ];

  const cashFlowData = [
    { month: 'Jan', operating: 1924, investing: 0, financing: -1400, net: 524 },
    { month: 'Feb', operating: 9579, investing: 0, financing: -12400, net: -2821 },
    { month: 'Mar', operating: 14077, investing: 0, financing: -16749, net: -2672 },
    { month: 'Apr', operating: 22229, investing: -25562, financing: 16755, net: 13421 },
    { month: 'May', operating: -9087, investing: 0, financing: -4326, net: -13413 },
    { month: 'Jun', operating: -5593, investing: 0, financing: -1400, net: -6993 },
    { month: 'Jul', operating: -707, investing: 0, financing: -1523, net: -2231 },
    { month: 'Aug', operating: 1477, investing: 0, financing: -1618, net: -141 },
    { month: 'Sep', operating: -2694, investing: 0, financing: -360, net: -3054 },
    { month: 'Oct', operating: 12941, investing: 0, financing: -960, net: 11981 },
  ];

  const expenseBreakdown = [
    { name: 'Advertising', value: 34633, color: '#0ea5e9' },
    { name: 'Payroll', value: 40941, color: '#06b6d4' },
    { name: 'Rent/Lease', value: 16682, color: '#14b8a6' },
    { name: 'Meals', value: 16245, color: '#10b981' },
    { name: 'Bank Fees', value: 13144, color: '#22c55e' },
    { name: 'Office/Admin', value: 13454, color: '#84cc16' },
  ];

  const cogsBreakdown = [
    { name: 'Job Materials', value: 194919, color: '#f97316' },
    { name: 'Subcontractor', value: 40805, color: '#fb923c' },
    { name: 'Small Tools', value: 36009, color: '#fdba74' },
    { name: 'Auto/Fuel', value: 15545, color: '#fed7aa' },
    { name: 'Direct Labor', value: 15408, color: '#ffedd5' },
  ];

  const totalRevenue = 520028;
  const totalCOGS = 302685;
  const grossProfit = 217343;
  const totalExpenses = 160805;
  const netIncome = 44146;
  const grossMargin = ((grossProfit / totalRevenue) * 100).toFixed(1);
  const netMargin = ((netIncome / totalRevenue) * 100).toFixed(1);

  const formatCurrency = (value) => value >= 1000 ? `$${(value / 1000).toFixed(0)}K` : `$${value.toLocaleString()}`;
  const formatFullCurrency = (value) => `$${value.toLocaleString()}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', padding: '12px 16px' }}>
          <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', fontWeight: '600' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, fontSize: '13px', margin: '4px 0' }}>{entry.name}: {formatFullCurrency(entry.value)}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif", color: '#e2e8f0', padding: '32px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>MS</div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#e2e8f0', margin: 0 }}>Mako Shade</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Financial Performance Dashboard • January – October 2025</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(30, 41, 59, 0.6)', padding: '8px 16px', borderRadius: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #8b5cf6, #a855f7)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: 'white' }}>{currentUser.name.charAt(0)}</div>
            <div>
              <p style={{ margin: 0, fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>{currentUser.name}</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>{currentUser.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} style={{ padding: '10px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#f87171', fontSize: '13px', cursor: 'pointer' }}>Sign Out</button>
        </div>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(30, 41, 59, 0.6)', padding: '4px', borderRadius: '12px' }}>
          {['overview', 'income', 'balance', 'cashflow'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500', background: activeTab === tab ? 'linear-gradient(135deg, #06b6d4, #10b981)' : 'transparent', color: activeTab === tab ? '#0f172a' : '#94a3b8' }}>{tab === 'cashflow' ? 'Cash Flow' : tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {[
          { label: 'Total Revenue', value: totalRevenue, color: '#06b6d4' },
          { label: 'Gross Profit', value: grossProfit, color: '#10b981' },
          { label: 'Net Income', value: netIncome, color: '#f97316' },
          { label: 'Total Assets', value: 37354, color: '#8b5cf6' },
          { label: 'Total Equity', value: 15384, color: '#ec4899' },
        ].map((kpi, idx) => (
          <div key={idx} style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))', borderRadius: '16px', padding: '24px', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
            <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>{kpi.label}</p>
            <p style={{ fontSize: '28px', fontWeight: '700', margin: 0, color: '#f1f5f9' }}>{formatFullCurrency(kpi.value)}</p>
          </div>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))', borderRadius: '20px', padding: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px', color: '#e2e8f0' }}>Revenue & Profitability Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} name="Revenue" />
                <Area type="monotone" dataKey="grossProfit" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Gross Profit" />
                <Line type="monotone" dataKey="netIncome" stroke="#f97316" strokeWidth={2} name="Net Income" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))', borderRadius: '20px', padding: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px', color: '#e2e8f0' }}>Operating Expenses</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
                  {expenseBreakdown.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                </Pie>
                <Tooltip formatter={(value) => formatFullCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))', borderRadius: '20px', padding: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px', color: '#e2e8f0' }}>Monthly Net Income</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="netIncome" name="Net Income" radius={[4, 4, 0, 0]}>
                  {monthlyData.map((entry, index) => (<Cell key={index} fill={entry.netIncome >= 0 ? '#10b981' : '#ef4444'} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))', borderRadius: '20px', padding: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px', color: '#e2e8f0' }}>Cost of Goods Sold</h3>
            {cogsBreakdown.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>{item.name}</span>
                  <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{formatFullCurrency(item.value)}</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(148, 163, 184, 0.1)', borderRadius: '4px' }}>
                  <div style={{ height: '100%', width: `${(item.value / 194919) * 100}%`, background: item.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'income' && (
        <div style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))', borderRadius: '20px', padding: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px', color: '#e2e8f0' }}>Revenue vs Cost Structure</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#06b6d4" />
              <Bar dataKey="cogs" name="COGS" fill="#f97316" />
              <Bar dataKey="expenses" name="Expenses" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'balance' && (
        <div style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))', borderRadius: '20px', padding: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px', color: '#e2e8f0' }}>Balance Sheet Trend</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={balanceSheetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="assets" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Assets" />
              <Area type="monotone" dataKey="liabilities" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Liabilities" />
              <Area type="monotone" dataKey="equity" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Equity" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'cashflow' && (
        <div style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))', borderRadius: '20px', padding: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px', color: '#e2e8f0' }}>Cash Flow by Activity</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="operating" name="Operating" fill="#10b981" />
              <Bar dataKey="investing" name="Investing" fill="#8b5cf6" />
              <Bar dataKey="financing" name="Financing" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <footer style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(148, 163, 184, 0.1)', display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px' }}>
        <span>Data as of October 31, 2025</span>
        <span>Mako Shade Financial Dashboard</span>
      </footer>
    </div>
  );
}
