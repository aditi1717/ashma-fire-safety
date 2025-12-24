const STORAGE_KEYS = {
    AUTH: 'ashma_auth',
    CUSTOMERS: 'ashma_customers',
    PROJECTS: 'ashma_projects',
};

export const storage = {
    // Auth
    setAuth: (user) => localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user)),
    getAuth: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH)),
    clearAuth: () => localStorage.removeItem(STORAGE_KEYS.AUTH),

    // Customers
    getCustomers: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) || [],
    saveCustomer: (customer) => {
        const customers = storage.getCustomers();
        customers.unshift({ ...customer, id: Date.now().toString() });
        localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    },

    // Projects
    getProjects: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || [],
    saveProject: (project) => {
        const projects = storage.getProjects();
        const payments = project.payments || [];
        const totalPaid = payments.reduce((acc, p) => acc + parseFloat(p.amount), 0);

        const newProject = {
            ...project,
            id: Date.now().toString(),
            payments: payments,
            totalPaid: totalPaid,
            remainingAmount: parseFloat(project.totalAmount) - totalPaid
        };
        projects.unshift(newProject);
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    },

    updateProject: (updatedProject) => {
        const projects = storage.getProjects();
        const index = projects.findIndex(p => p.id === updatedProject.id);
        if (index !== -1) {
            projects[index] = updatedProject;
            localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
        }
    }
};
