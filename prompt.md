# LIST IT — COMPLETE MOBILE APP DEVELOPMENT PROMPT

Build a polished, production-quality mobile productivity application called **“List It”** using **React Native + TypeScript**.

The app is a flexible universal list-management application.

The core idea is extremely simple:

> **If the user needs to remember, organize, plan, collect, track, or manage something — they can List It.**

Users should be able to create lists for absolutely anything:

- Ideas
- Tasks
- Work
- Shopping
- Groceries
- Products
- Movies
- Books
- Goals
- Projects
- Study topics
- Travel plans
- Packing
- Expenses
- Habits
- Notes
- Content ideas
- Things to buy
- Things to learn
- Anything else

The application should feel like a combination of a **modern list manager, lightweight task manager, personal organizer, idea vault, checklist app, and productivity dashboard**, while remaining extremely simple to understand.

---

# 1. CORE PRODUCT PHILOSOPHY

The app should follow this principle:

> **Create a list → Add things → Organize them → Get things done.**

Do NOT make the application feel like an overloaded enterprise project-management tool.

The user should be able to open the app and create their first list within seconds.

The interface must progressively reveal advanced functionality rather than displaying every option at once.

Simple actions should remain simple.

For example:

User wants groceries:

Create List → "Groceries" → Add items → Check them off.

User wants a project:

Create List → "Website Project" → Add tasks → Add priorities, due dates, notes, subtasks, sections, etc.

User wants ideas:

Create List → "Content Ideas" → Add ideas → Tag, favorite, categorize, archive, search, etc.

---

# 2. TECHNOLOGY STACK

Use:

- React Native
- TypeScript
- Expo
- Expo Router
- Zustand for application state
- AsyncStorage only for lightweight preferences
- React Native Reanimated for animations
- React Native Gesture Handler for gestures
- Expo Notifications for reminders
- Expo Haptics for tactile feedback
- Expo Image Picker where image attachments are required
- Lucide React Native or another clean icon library
- NativeWind OR a clean custom styling system

Architecture must be modular and scalable.

Do not put the entire application inside a few huge files.

Use reusable components and feature-based organization.

---

# 3. IMPORTANT FUNCTIONAL REQUIREMENT

THIS MUST BE A REAL FUNCTIONAL APPLICATION.

Do not create a static UI prototype.

Every major interaction visible in the UI must actually work.

Examples:

- Create list
- Rename list
- Delete list
- Duplicate list
- Archive list
- Favorite list
- Add item
- Edit item
- Delete item
- Complete item
- Reorder items
- Search
- Filter
- Sort
- Create sections
- Add subtasks
- Set priority
- Set dates
- Set reminders
- Add notes
- Add tags
- Undo deletion
- Restore archived items
- Change list appearance
- etc.

Data must persist after closing and reopening the application.

---

# 4. VISUAL DESIGN DIRECTION

Use the uploaded reference UI as the primary visual inspiration.

DO NOT directly copy the reference application.

Instead, translate its visual language into the List It brand.

The visual identity should feel:

- Playful
- Friendly
- Modern
- Premium
- Slightly retro
- Soft
- Human
- Creative
- Organized
- Approachable

Avoid the generic modern SaaS appearance.

Do NOT make it look like:

- Notion
- Todoist
- Microsoft To Do
- Google Keep
- Generic AI dashboards
- Generic productivity templates

The app should have its own recognizable visual identity.

---

# 5. COLOR SYSTEM

Use a soft pastel palette inspired by the reference.

Primary background:

- Soft lavender / light purple

Supporting colors:

- Pale mint
- Soft yellow
- Light peach
- Gentle pink
- Soft blue
- Lavender
- Off-white

Use black or very dark charcoal for:

- Text
- Icons
- Borders
- Outlines

Use white/off-white for cards and content surfaces.

Avoid excessive gradients.

The interface should feel colorful through **small purposeful accents**, not rainbow-colored everywhere.

Allow each list to have its own accent color.

Example:

Groceries → Yellow

Work → Mint

Ideas → Lavender

Shopping → Peach

Study → Blue

---

# 6. DESIGN LANGUAGE

Use:

- Large rounded corners
- Thick but subtle dark outlines
- Soft shadows
- Layered cards
- Slightly playful typography
- Large touch targets
- Rounded buttons
- Rounded chips
- Friendly icons
- Subtle asymmetry where appropriate
- Occasional hand-drawn visual elements

Cards should have enough spacing.

Do not overcrowd the interface.

The black outlines from the reference should be used selectively to create personality.

Avoid making every element heavily outlined.

---

# 7. TYPOGRAPHY

Typography should feel friendly but highly readable.

Use a modern rounded font if available.

Otherwise use a clean system font with slightly playful sizing.

Hierarchy:

App title → large and bold

Section title → medium/bold

List title → strong

Item title → readable and compact

Metadata → small and muted

Buttons → medium/bold

Avoid tiny text.

The app must remain comfortable on smaller phones.

---

# 8. APP STRUCTURE

Main navigation should contain:

1. Home
2. Lists
3. Inbox
4. Search
5. More / Settings

Use a modern bottom navigation bar.

The navigation should remain extremely simple.

---

# 9. HOME SCREEN

The Home screen should act as a personal productivity dashboard.

Top:

"Good morning, [Name]"

Below:

A small contextual summary such as:

"12 things to finish today"

Then show:

### Quick Add

A large floating/central input:

"What do you want to List?"

The user can immediately type:

- Buy milk
- New YouTube idea
- Finish assignment
- Buy headphones
- Learn React Native

Pressing enter should quickly add the item to the Inbox or selected list.

---

## HOME SECTIONS

### Today

Display items due today.

### Upcoming

Display upcoming tasks.

### Favorites

Show favorite lists.

### Recently Used

Show recently opened lists.

### Quick Lists

Show common lists.

### Progress

A small productivity summary:

- Completed today
- Remaining
- Completed this week
- Active lists

Keep this section compact.

Do not turn Home into a huge analytics dashboard.

---

# 10. LISTS SCREEN

This is the heart of the application.

Display all lists in a beautiful grid/list layout.

Each list card should show:

- List icon
- List name
- Number of items
- Number completed
- Progress indicator
- Accent color
- Optional description
- Last updated time

Example:

┌─────────────────────────┐
│ 🛒 Groceries            │
│                         │
│ 8 / 14 completed        │
│ ███████░░░              │
│                         │
│ 6 remaining             │
└─────────────────────────┘

Allow switching between:

- Grid view
- Compact list view

Remember the user's preference.

---

# 11. CREATE LIST

The Create List flow should be one of the most polished interactions.

When the user presses:

"+ Create List"

open a beautiful bottom sheet.

Fields:

List Name

Description

Icon

Color

Template

Optional category

Examples:

- Tasks
- Shopping
- Ideas
- Work
- Study
- Goals
- Projects
- Travel
- Custom

Allow the user to choose:

Icon + Color + Layout

Then create the list.

---

# 12. SMART LIST TEMPLATES

Provide useful templates.

Templates should include:

### Simple Checklist

Basic checklist.

### Grocery List

Categories such as:

- Fruits
- Vegetables
- Dairy
- Snacks
- Household

### Project

Sections:

- Backlog
- In Progress
- Review
- Completed

### Content Ideas

Fields:

- Idea
- Platform
- Topic
- Status
- Priority

### Study List

Fields:

- Topic
- Subject
- Priority
- Status
- Notes

### Shopping List

Fields:

- Product
- Quantity
- Price
- Priority

### Packing List

Sections:

- Clothes
- Electronics
- Documents
- Toiletries
- Miscellaneous

### Movie / Watch List

Fields:

- Title
- Genre
- Rating
- Status

### Book List

Fields:

- Title
- Author
- Status
- Rating

### Goal List

Fields:

- Goal
- Deadline
- Progress

Also allow:

"Blank List"

---

# 13. LIST DETAIL SCREEN

This is the most important screen.

Header:

Back button

List icon

List name

More menu

Below:

Progress bar

"8 of 14 completed"

Then:

Search within list

Filter

Sort

Add section

Add item

---

# 14. LIST ITEMS

Each item should support multiple levels of complexity.

Basic item:

☐ Buy milk

Advanced item:

☐ Finish React Native project

Priority: High

Due: Tomorrow

Tags: #college #project

Notes: Finish authentication screen.

Subtasks:

☐ Build UI

☐ Connect database

☐ Test navigation

The default view should ONLY show the important information.

Advanced information appears when the item is expanded.

---

# 15. ITEM INTERACTIONS

Users should be able to:

- Tap checkbox
- Tap item to open details
- Swipe right → complete
- Swipe left → reveal actions
- Long press → reorder
- Drag → reorder
- Tap + → add item
- Duplicate
- Move to another list
- Add to favorites
- Archive
- Delete

Use smooth gesture animations.

Completed items should animate subtly.

Do NOT use excessive animations.

---

# 16. ITEM DETAIL SCREEN

When opening an item, show:

Title

Description

Notes

Priority

Status

Due date

Reminder

Tags

Subtasks

Attachments

Created date

Updated date

List

Activity/history

Actions:

Complete

Duplicate

Move

Archive

Delete

The detail screen should feel clean rather than like a form.

---

# 17. SUBTASKS

Every item can optionally contain subtasks.

Example:

Main task:

"Build Portfolio"

Subtasks:

☐ Design homepage

☐ Build navbar

☐ Add projects

☐ Add animations

☐ Deploy

Display:

3/5 completed

with a small progress indicator.

---

# 18. SECTIONS

Allow lists to be divided into sections.

Example:

LIST: WEBSITE PROJECT

BACKLOG

- Research
- Design ideas

IN PROGRESS

- Homepage
- Navbar

COMPLETED

- Setup React Native

Users should be able to:

- Create section
- Rename section
- Delete section
- Reorder section
- Collapse section
- Move items between sections

---

# 19. PRIORITY SYSTEM

Provide:

None

Low

Medium

High

Urgent

Use subtle visual indicators.

Do not make the screen visually noisy.

---

# 20. STATUS SYSTEM

Allow statuses:

Not Started

In Progress

Waiting

Completed

Archived

For simple checklist lists, hide unnecessary status complexity.

For project lists, make statuses more visible.

---

# 21. DATES

Items can optionally have:

- Start date
- Due date
- Reminder
- Recurring schedule

Examples:

Today

Tomorrow

This weekend

Next week

Custom date

---

# 22. RECURRING ITEMS

Support recurring items:

- Every day
- Every weekday
- Every week
- Every month
- Every year
- Custom recurrence

Example:

"Review finances"

Every Sunday.

When completed, automatically generate the next occurrence.

---

# 23. REMINDERS

Use local notifications.

Users should be able to set:

- Reminder time
- Reminder date
- Recurring reminder

The app should request notification permission only when needed.

Do not request every permission immediately on first launch.

---

# 24. TAGS

Allow tags:

#college

#work

#personal

#shopping

#ideas

#urgent

Users can create custom tags.

Tapping a tag should show all associated items.

---

# 25. SEARCH

Search should be extremely powerful.

Global search should search:

- Lists
- Items
- Notes
- Tags
- Subtasks

Example:

Search "React"

Results:

Website Project
React Native Course
React Ideas
React Notes

Highlight matching text.

Search should feel instant.

---

# 26. FILTERING

Provide filters:

Status

Priority

Due date

Tags

Completed

Incomplete

List

Sections

Favorites

Filters should be presented through a clean bottom sheet.

Allow multiple filters simultaneously.

Example:

High Priority + Incomplete + Due This Week

---

# 27. SORTING

Allow:

Manual order

Alphabetical

Recently added

Recently updated

Priority

Due date

Completion

Custom

Remember the selected sorting method per list.

---

# 28. INBOX

Create an Inbox for quick capture.

This is extremely important.

When the user doesn't know where something belongs, they can simply add it to Inbox.

Example:

"Buy new laptop"

Later:

Move → Shopping

"New app idea"

Move → Ideas

"Submit assignment"

Move → College

Inbox should prevent users from constantly deciding where to put something.

---

# 29. QUICK ADD

Create a global quick-add button.

It should be accessible from most screens.

When opened:

"What do you want to add?"

Input

Then optional:

List

Priority

Date

Tag

The basic flow should only require typing and saving.

---

# 30. SMART QUICK ADD

Where possible, intelligently interpret simple input.

Examples:

"Submit assignment tomorrow"

Could detect:

Title: Submit assignment

Due: Tomorrow

"Buy milk #groceries"

Could detect:

Title: Buy milk

Tag: groceries

"Call John high priority"

Could detect priority.

This should NOT require AI or an internet connection.

Use lightweight local parsing.

Always allow the user to edit the detected values.

---

# 31. FAVORITES

Users can favorite:

- Lists
- Items
- Tags

Favorites should be easily accessible.

---

# 32. ARCHIVE

Never immediately destroy important data when avoidable.

Allow:

Archive list

Archive item

Archived content should be accessible from:

More → Archive

Allow restore.

---

# 33. TRASH

Deleted items should optionally go into Trash.

Allow:

Restore

Permanent delete

Empty trash

Add an undo snackbar immediately after deletion.

Example:

"Item deleted     Undo"

---

# 34. DUPLICATE

Allow users to duplicate:

- Lists
- Items
- Sections

This is especially useful for templates.

Example:

Duplicate "Weekly Grocery List"

creates:

"Weekly Grocery List Copy"

---

# 35. MOVE ITEMS

Allow an item to be moved to another list.

Example:

Inbox → Work

Work → Personal

Shopping → Groceries

Use a polished selection modal.

---

# 36. MULTI-SELECT

Long press an item to enter selection mode.

Allow selecting multiple items.

Actions:

Complete

Delete

Move

Archive

Set priority

Add tag

Duplicate

This should make managing large lists extremely efficient.

---

# 37. DRAG AND DROP

Allow drag-and-drop reordering.

Use React Native Gesture Handler and Reanimated.

Dragging should feel smooth and physical.

Cards should slightly lift while dragging.

---

# 38. LIST CUSTOMIZATION

Every list should have:

- Icon
- Color
- Name
- Description
- Optional cover/illustration
- Layout style

Possible layouts:

Checklist

Compact

Sections

Kanban-style

Cards

But do not overwhelm the user.

Only show advanced layouts when useful.

---

# 39. LIST TYPES

A list can optionally have a "mode."

Modes:

### Checklist

Simple completion.

### Tasks

Priority + dates + status.

### Shopping

Quantity + price + category.

### Ideas

Notes + tags + status.

### Project

Sections + status + subtasks.

### Collection

Simple catalog of things.

### Custom

User decides fields.

This makes List It extremely flexible without forcing every list to contain every feature.

---

# 40. CUSTOM FIELDS

For advanced users, allow custom fields.

Examples:

Product list:

Price

Brand

Rating

URL

Quantity

Book list:

Author

Genre

Rating

Pages

Status

Custom fields should be optional.

Do not display them on basic lists.

---

# 41. NOTES

Allow rich-ish notes for items.

Support:

- Plain text
- Checklists
- Simple formatting
- Links

Keep the editor lightweight.

---

# 42. ATTACHMENTS

Allow optional:

- Images
- Photos
- Links

Example:

Product item:

"Mechanical Keyboard"

Image

Price

Product link

Notes

---

# 43. PRODUCT / SHOPPING MODE

Shopping lists should support:

Item

Quantity

Price

Store

Purchased

Optional URL

Total estimated cost

Total purchased cost

Example:

Milk × 2

₹60

Eggs × 12

₹90

Total:

₹150

Keep this feature hidden unless the list uses Shopping mode.

---

# 44. PRODUCTIVITY INSIGHTS

Add a lightweight Insights screen.

Show:

Completed today

Completed this week

Current active items

Overdue items

Most productive day

Completion rate

Do NOT make this feel like surveillance or gamification.

The goal is understanding productivity, not pressuring the user.

---

# 45. CALENDAR VIEW

Provide an optional calendar view for users who use dates.

Display:

Today

Upcoming

Overdue

Scheduled items

Selecting a date shows its items.

---

# 46. TODAY VIEW

A dedicated Today screen can show:

Overdue

Due today

Scheduled today

Completed today

This should be extremely useful for daily planning.

---

# 47. ONBOARDING

Create a short, beautiful onboarding.

Screen 1:

"Everything you need to remember."

Screen 2:

"Create lists for anything."

Screen 3:

"Organize without the mess."

Screen 4:

"Get things done."

Then:

"Let's List It"

Do not force a long tutorial.

Allow Skip.

---

# 48. EMPTY STATES

Empty states should be beautiful and useful.

Example:

No lists:

"Nothing here yet."

"Create your first list and start organizing."

Button:

"+ Create List"

Inbox empty:

"Your brain is clear."

"Capture something whenever you need to."

Do not use generic blank screens.

Use small playful illustrations.

---

# 49. SETTINGS

Settings should include:

Profile

Appearance

Theme

Default list

Notifications

Reminder settings

Start screen

Default sorting

Haptics

Animations

Backup

Import

Export

Data management

Trash

Archive

About

Privacy

---

# 50. THEMES

Support:

Light

Dark

System

The dark mode should be carefully designed rather than simply inverting colors.

Preserve the playful pastel identity in dark mode through controlled accent colors.

---

# 51. DATA STORAGE

The application should work fully offline.

Primary data should be stored locally.

Possible entities:

User

List

ListSection

ListItem

Subtask

Tag

ItemTag

Reminder

Attachment

CustomField

ListCustomField

Activity

Settings

Use proper relationships.

Data should persist after:

- App restart
- Phone restart
- Navigation
- Backgrounding

---

# 52. DATA MODEL

Create a clean scalable architecture.

Example:

List

- id
- name
- description
- icon
- color
- type
- layout
- isFavorite
- isArchived
- createdAt
- updatedAt

ListItem

- id
- listId
- sectionId
- title
- description
- notes
- status
- priority
- dueDate
- reminderDate
- isCompleted
- isFavorite
- sortOrder
- createdAt
- updatedAt

Subtask

- id
- itemId
- title
- isCompleted
- sortOrder

Tag

- id
- name
- color

Keep the schema extensible.

---

# 53. PERFORMANCE

The app must feel extremely fast.

Avoid unnecessary re-renders.

Use:

- Memoization
- Virtualized lists
- Efficient Zustand selectors
- Lazy loading where appropriate

Large lists should remain smooth.

Test with hundreds or thousands of items.

---

# 54. ANIMATIONS

Animations are an important part of the personality.

Use Reanimated.

Examples:

Opening a list:

Cards subtly scale/fade.

Adding an item:

New item slides into the list.

Completing:

Checkbox animates.

Item completion:

Text gently changes and item transitions.

Deleting:

Item slides away.

Creating a list:

Bottom sheet smoothly expands.

Dragging:

Item lifts with a subtle shadow.

Navigation:

Use subtle transitions.

Keep animations short and responsive.

Never make the application feel slow because of animations.

---

# 55. HAPTICS

Use subtle haptic feedback for:

- Completing item
- Creating list
- Dragging
- Important actions

Allow haptics to be disabled in Settings.

---

# 56. ACCESSIBILITY

Support:

- Dynamic font sizing
- Screen readers
- Large touch targets
- Accessible labels
- Good contrast
- Reduced motion

Never rely only on color to communicate status.

---

# 57. RESPONSIVE DESIGN

The UI must work on:

- Small phones
- Standard phones
- Large phones
- Android
- iOS

Do not hardcode screen dimensions.

Use responsive layouts.

Handle:

- Safe areas
- Keyboard
- Notches
- Different aspect ratios

---

# 58. KEYBOARD EXPERIENCE

This is extremely important for a list application.

When adding an item:

- Automatically focus input
- Open keyboard
- Allow pressing Enter to create item
- Keep keyboard open for rapid entry

Example:

Buy milk → Enter

Buy eggs → Enter

Bread → Enter

Butter → Enter

This should feel extremely fast.

---

# 59. RAPID LIST CREATION

Provide an optional "Quick Entry" mode.

User can type multiple lines:

Milk
Eggs
Bread
Butter
Cheese

Press Add.

Automatically create five items.

This is one of the most useful features for grocery and checklist lists.

---

# 60. IMPORT / EXPORT

Allow users to export their data.

Formats:

JSON

CSV

TXT

Allow importing supported formats.

This makes the app feel trustworthy and user-owned.

---

# 61. BACKUP ARCHITECTURE

Design the data layer so cloud synchronization can be added later.

Do not require a backend for version one.

Structure the code so future sync can be added without rewriting the entire application.

---

# 62. NO LOGIN REQUIREMENT

The app should work immediately without forcing account creation.

The user should be able to:

Open app → Create list → Start using it.

If cloud sync is added later, account creation can be optional.

---

# 63. HOME QUICK ACTIONS

Add a small quick-action area:

+ Task

+ List

+ Idea

+ Shopping Item

+ Note

These should open the fastest possible creation flow.

---

# 64. CONTEXTUAL UI

Do not show every feature everywhere.

For a basic checklist:

Show:

Checkbox

Title

Optional priority

For a project:

Show:

Status

Priority

Due date

Subtasks

For shopping:

Show:

Quantity

Price

Purchased

The interface should adapt to what the user is doing.

---

# 65. SMART EMPTY STATES

Examples:

No tasks today:

"You're all caught up."

No ideas:

"Your next great idea can start here."

Empty grocery list:

"What's missing from the kitchen?"

Empty project:

"Start by adding the first step."

Make these friendly but not cheesy.

---

# 66. MORE MENU

The More menu should contain:

Today

Calendar

Insights

Favorites

Archive

Trash

Tags

Templates

Import / Export

Settings

Keep navigation organized.

---

# 67. DESIGN DETAILS INSPIRED BY THE REFERENCE

Use the reference's visual characteristics:

- Lavender background
- Mint headers
- Yellow CTA buttons
- White content cards
- Dark outlines
- Rounded corners
- Small playful illustrations
- Soft shadows
- Large friendly typography
- Pastel accent blocks
- Slightly playful UI composition

However, create a distinct **List It** visual identity.

Possible branding concept:

A checkmark inside a rounded list/card.

App icon:

A simple list with three lines and a checkmark.

Keep it recognizable even at small sizes.

---

# 68. MICROCOPY

Use friendly microcopy.

Examples:

"List it."

"What's on your mind?"

"Add one more thing."

"You're all caught up."

"Nothing hiding here."

"Move it somewhere useful."

"Make a list. Make life easier."

Avoid corporate language.

---

# 69. UX PRINCIPLE — PROGRESSIVE COMPLEXITY

This is extremely important.

The application contains many features, but the user should NOT feel like there are many features.

Default experience:

List → Items → Check.

Advanced experience:

List → Sections → Items → Subtasks → Priority → Dates → Tags → Notes → Attachments → Custom fields.

Hide advanced functionality behind:

- Expand
- More
- Item detail
- Bottom sheets
- Context menus

The user should discover features naturally.

---

# 70. ERROR HANDLING

Every operation should handle errors gracefully.

Examples:

Failed database operation

Invalid date

Notification permission denied

Import failure

Export failure

Duplicate data

Large dataset

Never crash the app.

Show friendly error messages.

---

# 71. UNDO ACTIONS

For destructive actions use:

Snackbar + Undo.

Example:

"List deleted"

[Undo]

The undo action should actually restore the data.

---

# 72. CONFIRMATION DIALOGS

Do not ask for confirmation for everything.

Use confirmation for destructive actions such as:

Permanent delete

Empty trash

Delete entire list

Otherwise use undo.

---

# 73. APP STARTUP

The app should launch quickly.

Show a minimal branded loading state only when necessary.

Do not display a long splash screen.

---

# 74. SAMPLE DATA

On first launch, optionally provide a small demo list setup that users can remove.

Example lists:

Ideas

Today's Tasks

Groceries

Projects

Books to Read

But make it possible to start completely empty.

---

# 75. COMPONENT SYSTEM

Create reusable components such as:

AppHeader

ListCard

ListItem

ChecklistItem

SectionHeader

ProgressBar

TagChip

PriorityBadge

SearchBar

FilterSheet

SortSheet

CreateListSheet

CreateItemSheet

ItemDetailSheet

ConfirmationDialog

UndoSnackbar

EmptyState

QuickAdd

FloatingActionButton

BottomNavigation

Calendar

StatsCard

Do not duplicate UI code.

---

# 76. CODE ORGANIZATION

Use a scalable structure similar to:

src/

components/

features/

screens/

navigation/

store/

database/

services/

hooks/

utils/

constants/

types/

assets/

Keep business logic separate from UI.

Use TypeScript types throughout.

Avoid `any` wherever possible.

---

# 77. SECURITY AND PRIVACY

The app should not send user data anywhere without explicit consent.

Since the initial version is local-first:

- No unnecessary network requests
- No analytics by default
- No external AI requirement
- User data stays on device

Clearly communicate this in Settings / About.

---

# 78. FINAL UI QUALITY BAR

The final application should feel like a real premium app that could be published to the App Store / Play Store.

It should NOT look like:

- A coding demo
- A template
- An AI-generated dashboard
- A school project
- A collection of random screens

Every screen must feel part of the same design system.

Spacing must be consistent.

Icons must be consistent.

Typography must be consistent.

Colors must be consistent.

Animations must be consistent.

Interactions must be predictable.

---

# 79. REQUIRED SCREENS

Implement at minimum:

1. Splash
2. Onboarding
3. Home
4. Lists
5. Create List
6. List Detail
7. Create Item
8. Item Detail
9. Search
10. Inbox
11. Today
12. Calendar
13. Favorites
14. Archive
15. Trash
16. Tags
17. Templates
18. Insights
19. Settings
20. Appearance
21. Notification settings
22. Import / Export

Every screen must be connected to the actual application state.

---

# 80. MOST IMPORTANT USER FLOWS

Test these flows thoroughly.

FLOW 1:

Open app

→ Create List

→ Name "Groceries"

→ Select shopping template

→ Add Milk

→ Add Eggs

→ Add Bread

→ Check Milk

→ Progress updates.

FLOW 2:

Open app

→ Quick Add

→ Type "Finish assignment"

→ Set due date

→ Set high priority

→ Save

→ Appears in Today/Upcoming.

FLOW 3:

Create Project

→ Add sections

→ Add task

→ Add subtasks

→ Complete subtasks

→ Progress updates.

FLOW 4:

Create Idea

→ Add tags

→ Add notes

→ Favorite

→ Search for idea

→ Open it.

FLOW 5:

Create item in Inbox

→ Move item to another list.

FLOW 6:

Long press multiple items

→ Multi-select

→ Move them to another list.

FLOW 7:

Delete item

→ Snackbar appears

→ Undo

→ Item returns.

FLOW 8:

Close application

→ Reopen

→ All data remains intact.

---

# 81. QUALITY ASSURANCE

Before considering the app complete, test:

- Creating lists
- Editing lists
- Deleting lists
- Archiving lists
- Creating items
- Editing items
- Completing items
- Reordering
- Dragging
- Subtasks
- Sections
- Search
- Filtering
- Sorting
- Tags
- Favorites
- Dates
- Reminders
- Recurring items
- Notifications
- Import
- Export
- Trash
- Undo
- Dark mode
- Keyboard behavior
- Small screens
- Large screens
- Android
- iOS
- App restart persistence

Fix every:

- UI overflow
- Keyboard issue
- Navigation issue
- State synchronization bug
- Database bug
- Animation glitch
- Touch target problem
- Empty state issue

Do not leave placeholder buttons.

Do not leave fake functionality.

---

# 82. IMPORTANT DESIGN RULE

Do not attempt to put every feature on the main screen.

The application should follow:

**Simple surface → Powerful underneath.**

A new user should understand the app within 10 seconds.

An advanced user should discover enough depth to use List It as their primary organization system.

---

# 83. FINAL EXPERIENCE

When the user opens List It, the feeling should be:

"I can put anything here."

When they create a list:

"That was easy."

When they add items:

"This is fast."

When they start organizing:

"I have complete control."

When they discover advanced features:

"Oh, this can actually manage everything."

The final product should feel like a **beautiful universal personal organization system**, not just another checklist app.

Build the entire experience around the idea:

# LIST IT.

If it's something you need to remember, organize, plan, collect, track, or accomplish —

**List It.**