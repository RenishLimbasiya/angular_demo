# Taskflow screen and flow map

Reference: `stitch_taskflow_project_manager (1).zip` (11 screen designs plus one design-system note).

## Shared product structure

- **Entry:** Sign in and sign up share a split, editorial layout, muted navy/blue palette, Inter-style typography, SSO/email options, and a restrained trust footer. Sign-up adds workspace identity, a generated subdomain preview, password rules, and terms consent.
- **Workspace shell:** 240px desktop sidebar with Dashboard, Projects, My Tasks, Kanban Board, Team Members, and Settings; top bar with workspace/page breadcrumb, global search, notifications, and New Task; responsive sidebar and content canvas.
- **Visual language:** cool near-white canvas, white cards, slate borders, blue primary actions, 8px control/card corners, compact labels and status chips, and restrained elevation. Priority uses rose for high, amber for medium, and green for low.

## Screen inventory and navigation

| Screen | Purpose and key elements | Expected flow |
| --- | --- | --- |
| Sign in | Email/password, remember me, password recovery, Google/Microsoft/GitHub entry | Successful auth opens the workspace dashboard |
| Sign up | Name, work email, workspace, workspace slug, password requirements, terms | Creates first account/workspace, then opens dashboard |
| Dashboard | Workspace KPIs, project summaries, recent task list, quick actions | Jump into project, task, or creation flows |
| Projects | Searchable project cards, status/progress, create project | Open a project overview |
| Project overview | Mission, team, sprint progress, health and analytics | Switch Overview, Board, List, Timeline, Analytics |
| Project task list | Project context, tabs, filters, batch actions, export and tasks | Open/edit a task or change project view |
| Kanban board | Status columns and task cards, filters, members and add-task affordance | Move task through To Do → In Progress → Completed |
| My Tasks | Personal workload metrics and filterable assigned-task list | Prioritize, complete, and inspect assigned work |
| Team Members | Roster, roles, capacity, invite and pending invite indicators | Invite collaborators and manage access |
| Settings | Profile, notifications, members, integrations, billing, workspace controls | Save workspace preferences |
| Taskflow fluid workspace | Detailed tokens, responsive rules and component guidance | Shared design-system reference |

## Implemented first slice

- `/login` and `/register` use a responsive shared auth frame and validate their forms.
- A demo account is seeded in local storage: `sarah.j@taskflow.io` / `Taskflow123!`.
- Registration stores accounts locally; successful login stores the active session and opens `/dashboard`.
- `/dashboard` has the common responsive workspace shell and seeded project, task, and teammate data. Non-dashboard navigation and creation controls currently provide a small preview notice while their destination screens are built.

## Next build order

1. Create Projects and project overview around the shared shell.
2. Add task model/actions, then List and Kanban views over the same task data.
3. Add My Tasks filters, Team invite/role management, and Settings persistence.
4. Replace local demo authentication and preview-only SSO with a real identity service when one is selected.
