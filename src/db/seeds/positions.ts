import { db } from '@/db';
import { positions } from '@/db/schema';

async function main() {
    const samplePositions = [
        {
            title: 'Senior Full Stack Developer',
            department: 'Engineering',
            location: 'Remote',
            employmentType: 'Full-time',
            salaryRange: '₹15-25 LPA',
            description: 'We are seeking an experienced Senior Full Stack Developer to join our dynamic engineering team. You will be responsible for designing and building scalable web applications using modern technologies. This role offers the opportunity to work on cutting-edge projects, lead technical initiatives, and mentor junior developers while contributing to our company\'s technical vision and growth.',
            requirements: JSON.stringify([
                '5+ years of professional software development experience',
                'Strong expertise in React.js and Next.js framework',
                'Proficient in Node.js and Express.js for backend development',
                'Advanced knowledge of TypeScript and JavaScript ES6+',
                'Experience with SQL and NoSQL databases (PostgreSQL, MongoDB)',
                'Familiarity with cloud platforms (AWS, Azure, or GCP)',
                'Understanding of microservices architecture and RESTful APIs',
                'Experience with Git, CI/CD pipelines, and agile methodologies'
            ]),
            responsibilities: JSON.stringify([
                'Develop and maintain scalable full-stack web applications',
                'Write clean, maintainable, and well-documented code',
                'Conduct thorough code reviews and provide constructive feedback',
                'Mentor junior developers and contribute to team growth',
                'Make architectural decisions and establish coding standards',
                'Collaborate with product managers and designers on feature development',
                'Optimize application performance and ensure security best practices',
                'Participate in sprint planning and technical discussions'
            ]),
            status: 'open',
            postedDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        },
        {
            title: 'DevOps Engineer',
            department: 'Engineering',
            location: 'Bangalore',
            employmentType: 'Full-time',
            salaryRange: '₹12-20 LPA',
            description: 'Join our infrastructure team as a DevOps Engineer to manage and optimize our cloud infrastructure and deployment pipelines. You will be instrumental in automating processes, ensuring system reliability, and implementing best practices for continuous integration and deployment. This role requires expertise in cloud platforms, containerization, and infrastructure as code.',
            requirements: JSON.stringify([
                '4+ years of experience in DevOps or similar role',
                'Strong experience with AWS or Azure cloud platforms',
                'Proficiency in Docker and Kubernetes orchestration',
                'Experience with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions',
                'Knowledge of Infrastructure as Code (Terraform, CloudFormation)',
                'Familiarity with monitoring tools (Prometheus, Grafana, ELK Stack)',
                'Strong scripting skills in Python, Bash, or similar languages',
                'Understanding of security best practices and compliance requirements'
            ]),
            responsibilities: JSON.stringify([
                'Design, implement, and maintain cloud infrastructure',
                'Build and optimize CI/CD pipelines for automated deployments',
                'Monitor system performance and ensure high availability',
                'Implement security measures and compliance standards',
                'Automate repetitive tasks and improve operational efficiency',
                'Troubleshoot production issues and perform root cause analysis',
                'Collaborate with development teams on infrastructure requirements',
                'Document infrastructure processes and maintain runbooks'
            ]),
            status: 'open',
            postedDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        },
        {
            title: 'UI/UX Designer',
            department: 'Design',
            location: 'Mumbai',
            employmentType: 'Full-time',
            salaryRange: '₹10-16 LPA',
            description: 'We are looking for a creative UI/UX Designer to craft beautiful and intuitive user interfaces that deliver exceptional user experiences. You will work closely with product managers and developers to create designs that balance aesthetics with functionality. This role involves user research, prototyping, and maintaining our design system to ensure consistency across all products.',
            requirements: JSON.stringify([
                '3+ years of professional UI/UX design experience',
                'Expert proficiency in Figma and Adobe Creative Suite',
                'Strong portfolio demonstrating user-centered design process',
                'Experience conducting user research and usability testing',
                'Knowledge of design systems and component libraries',
                'Understanding of responsive design and mobile-first approach',
                'Familiarity with HTML/CSS and basic front-end technologies',
                'Excellent communication and presentation skills'
            ]),
            responsibilities: JSON.stringify([
                'Create wireframes, mockups, and interactive prototypes',
                'Conduct user research and analyze user feedback',
                'Design intuitive user interfaces for web and mobile applications',
                'Maintain and evolve the company design system',
                'Collaborate with developers to ensure design implementation',
                'Present design concepts to stakeholders and iterate based on feedback',
                'Perform usability testing and incorporate insights into designs',
                'Stay updated with latest design trends and best practices'
            ]),
            status: 'open',
            postedDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        },
        {
            title: 'Business Development Manager',
            department: 'Sales',
            location: 'Remote',
            employmentType: 'Full-time',
            salaryRange: '₹8-15 LPA',
            description: 'We are seeking a dynamic Business Development Manager to drive growth and expand our client base. You will be responsible for identifying new business opportunities, building strategic partnerships, and closing deals. This role requires excellent communication skills, a strong understanding of the IT industry, and proven experience in B2B sales and relationship management.',
            requirements: JSON.stringify([
                '4+ years of experience in B2B sales or business development',
                'Proven track record in IT services or software industry',
                'Strong understanding of technology solutions and services',
                'Excellent communication and negotiation skills',
                'Experience with CRM tools like Salesforce or HubSpot',
                'Ability to understand client needs and propose solutions',
                'Strong networking and relationship-building abilities',
                'Bachelor\'s degree in Business, Marketing, or related field'
            ]),
            responsibilities: JSON.stringify([
                'Generate qualified leads and build sales pipeline',
                'Develop and execute strategic sales plans',
                'Build and maintain relationships with key decision-makers',
                'Present company offerings and negotiate contracts',
                'Achieve monthly and quarterly sales targets',
                'Conduct market research and competitive analysis',
                'Collaborate with technical teams on solution proposals',
                'Provide regular sales forecasts and reports to management'
            ]),
            status: 'open',
            postedDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        },
        {
            title: 'Digital Marketing Specialist',
            department: 'Marketing',
            location: 'Remote',
            employmentType: 'Full-time',
            salaryRange: '₹6-12 LPA',
            description: 'Join our marketing team as a Digital Marketing Specialist to drive our online presence and brand awareness. You will execute comprehensive digital marketing campaigns across multiple channels, optimize SEO/SEM strategies, and analyze performance metrics. This role requires creativity, analytical thinking, and expertise in modern digital marketing tools and techniques.',
            requirements: JSON.stringify([
                '3+ years of experience in digital marketing',
                'Strong expertise in SEO/SEM and content marketing',
                'Proficiency with Google Analytics, Google Ads, and social media platforms',
                'Experience managing social media marketing campaigns',
                'Knowledge of email marketing tools and automation',
                'Understanding of marketing analytics and ROI measurement',
                'Excellent content creation and copywriting skills',
                'Experience with marketing automation tools like HubSpot or Marketo'
            ]),
            responsibilities: JSON.stringify([
                'Plan and execute multi-channel digital marketing campaigns',
                'Optimize website content for search engines and user experience',
                'Manage social media accounts and create engaging content',
                'Analyze campaign performance and provide actionable insights',
                'Develop content strategy aligned with business objectives',
                'Manage paid advertising campaigns across Google Ads and social platforms',
                'Conduct A/B testing to improve conversion rates',
                'Collaborate with design and content teams on marketing materials'
            ]),
            status: 'open',
            postedDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        },
        {
            title: 'Project Manager',
            department: 'Management',
            location: 'Pune',
            employmentType: 'Full-time',
            salaryRange: '₹12-18 LPA',
            description: 'We are looking for an experienced Project Manager to lead software development projects from inception to delivery. You will be responsible for planning, executing, and closing projects while managing cross-functional teams, stakeholder expectations, and project budgets. This role requires strong leadership skills, technical knowledge, and expertise in agile methodologies.',
            requirements: JSON.stringify([
                '5+ years of experience in project management',
                'PMP or Agile certification (Scrum Master, SAFe)',
                'Proven track record of delivering software projects on time',
                'Strong knowledge of Agile and Scrum methodologies',
                'Proficiency with project management tools (Jira, Asana, MS Project)',
                'Excellent stakeholder management and communication skills',
                'Understanding of software development lifecycle',
                'Experience managing remote and distributed teams'
            ]),
            responsibilities: JSON.stringify([
                'Define project scope, objectives, and deliverables',
                'Create detailed project plans and resource allocation',
                'Lead daily stand-ups, sprint planning, and retrospectives',
                'Track project progress and manage project risks',
                'Facilitate communication between technical teams and stakeholders',
                'Ensure projects are delivered on time and within budget',
                'Manage change requests and scope adjustments',
                'Provide regular status updates to senior management and clients'
            ]),
            status: 'open',
            postedDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        }
    ];

    await db.insert(positions).values(samplePositions);
    
    console.log('✅ Positions seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});