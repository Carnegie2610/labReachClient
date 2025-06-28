# Remote Laboratory System Implementation Plan

## Project Overview
Design and Implementation of a Remote Lab Optimized for Low Connectivity Areas

## Tech Stack
- Frontend: Next.js 15
- Backend: Next.js API Routes
- Database: Supabase
- Real-time: MQTT (MQTTX cluster)
- Hardware: ESP32 + Arduino PPA
- UI: Tailwind CSS
- State Management: React Context
- Authentication: NextAuth.js

## Color Palette

| Hex       | Suggested Use                                          |
| --------- | ------------------------------------------------------ |
| `#271F30` | **Primary background** — dark mode base, header/nav    |
| `#E3B505` | **Accent/Action** — buttons, icons, highlights         |
| `#6DD3CE` | **Secondary accent** — links, info cards, hover states |
| `#757780` | **Text color (muted)** — secondary text, borders       |
| `#E2DADB` | **Background (light mode)** or neutral containers      |

## Project Structure

### Atomic Design Components

#### Atoms
- **Buttons**
  - PrimaryButton
  - SecondaryButton
  - IconButton
- **Inputs**
  - TextInput
  - SelectInput
  - DateInput
  - TimeInput
- **Navigation**
  - NavLink
  - NavDropdown
- **Layout**
  - Container
  - Grid
  - Card
- **Feedback**
  - Alert
  - Toast
  - LoadingSpinner

#### Molecules
- **Form Elements**
  - LoginForm
  - RegistrationForm
  - ReservationForm
  - EquipmentForm
- **Navigation**
  - NavigationBar
  - SidebarMenu
  - LanguageSelector
- **Display**
  - EquipmentCard
  - SessionCard
  - ReservationCard
  - UserCard
- **Interactive**
  - CompileButton
  - ResetButton
  - TimerDisplay

#### Organisms
- **Header**
  - UserMenu
  - LanguageSwitcher
  - NotificationCenter
- **Navigation**
  - MainNavigation
  - RoleNavigation
- **Dashboard**
  - ReservationDashboard
  - EquipmentDashboard
  - SessionDashboard
  - UserDashboard
- **Lab Interface**
  - LabExercise
  - SimulationControlPanel
  - EquipmentVisualization
  - LogViewer

## Project Phases

### Phase 1: Infrastructure Setup (Week 1)
- [ ] Set up Supabase project and database
- [ ] Configure environment variables
- [ ] Set up Next.js project structure with atomic design
- [ ] Implement basic authentication with NextAuth.js
- [ ] Set up MQTT connection
- [ ] Basic error handling and logging
- [ ] Create base atomic components

### Phase 2: Authentication & Authorization (Week 2)
- [ ] User roles table
- [ ] Role-based access control
- [ ] Login/Registration pages
- [ ] Language selection
- [ ] Session management

### Phase 3: Core UI Components (Week 3)
- [ ] Landing page
- [ ] Navigation components
- [ ] Layout components
- [ ] Common UI elements
- [ ] Internationalization setup

### Phase 4: Student Features (Week 4-5)
#### Reservation System
- [ ] Calendar component
- [ ] Time slot selection
- [ ] Reservation management
- [ ] Reminder system
- [ ] Session tracking

#### Lab Interface
- [ ] Equipment visualization
- [ ] Code editor integration
- [ ] Compilation system
- [ ] Log viewer
- [ ] Session timer

### Phase 5: Lab Technician Features (Week 6)
- [ ] Equipment status dashboard
- [ ] Connection monitoring
- [ ] Troubleshooting tools
- [ ] Protocol management
- [ ] Diagnostic interface

### Phase 6: Instructor Features (Week 7)
- [ ] Equipment template management
- [ ] Experiment configuration
- [ ] Student progress tracking
- [ ] Session monitoring
- [ ] Template library

### Phase 7: Admin Features (Week 8)
- [ ] User management dashboard
- [ ] Role assignment
- [ ] System configuration
- [ ] Activity logs
- [ ] Audit trail

### Phase 8: Testing & Optimization (Week 9)
- [ ] Performance optimization
- [ ] Connectivity tests
- [ ] Security audits
- [ ] User testing
- [ ] Bug fixes

## Database Schema

### Users Table
```sql
create table users (
  id uuid references auth.users on delete cascade not null primary key,
  role text not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Reservations Table
```sql
create table reservations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Equipment Table
```sql
create table equipment (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  status text not null,
  last_update timestamp with time zone default timezone('utc'::text, now()) not null,
  metadata jsonb
);
```

### Sessions Table
```sql
create table sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) not null,
  reservation_id uuid references reservations(id),
  start_time timestamp with time zone not null,
  end_time timestamp with time zone,
  status text not null
);
```

## Implementation Notes

### Authentication
- Use Supabase Auth with NextAuth.js
- Implement role-based access control
- Add language selection
- Implement session management

### Real-time Features
- Use MQTT for equipment communication
- Implement WebSocket for UI updates
- Add real-time status updates
- Implement connection monitoring

### Error Handling
- Implement comprehensive error logging
- Add user-friendly error messages
- Implement retry mechanisms
- Add connection status indicators

### Performance Optimization
- Implement caching strategies
- Optimize database queries
- Add connection pooling
- Implement lazy loading

## Next Steps

1. Set up Supabase project
2. Configure environment variables
3. Implement basic authentication
4. Set up database schema
5. Create landing page
6. Implement role selection

Would you like me to:
1. Start implementing any specific phase?
2. Create detailed component specifications?
3. Set up the Supabase database?
4. Implement the authentication system?

Please let me know which aspect you'd like to focus on first, and I'll provide more detailed guidance for that specific area.
