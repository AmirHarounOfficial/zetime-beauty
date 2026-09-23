# ZeTime Beauty — Complete Provider-Side User Stories

## Provider Roles

The Provider Side supports:

* Business Owner
* Branch Manager
* Branch Staff
* Business Professional
* Freelancer / Independent Professional
* Home-Service Professional

The permission model must ensure that every provider only accesses the business, branch, customers, bookings, professionals, services, financial records, and settings allowed by their role.

---

# EPIC — Provider Onboarding

### Business Registration

As a business owner, I want to register my beauty business on ZeTime so that I can start managing my business and receiving bookings.

The owner can enter:

* Business name
* Logo
* Cover photos
* Description
* Business type
* Gender / audience
* Phone
* Email
* Address
* Location
* Working hours
* Social media
* Tax information
* Business registration information

The owner must accept ZeTime terms and policies.

The owner submits the business for approval.

### Registration States

Business registration can be:

* Draft
* Submitted
* Under Review
* Approved
* Rejected
* Suspended
* Active
* Inactive

If rejected, the owner must be able to view the rejection reason and update the required information.

If approved, the business becomes eligible for activation.

---

# EPIC — Business Activation

As a business owner, I want to activate my business after approval so that customers can discover and book my services.

The business becomes customer-visible only when:

* Registration is approved
* Required information is completed
* Subscription is active
* Business is active
* At least one valid service exists
* At least one valid professional/service availability exists where required

The owner can temporarily deactivate the business.

Deactivated businesses should not accept new customer bookings.

Existing bookings must remain accessible.

---

# EPIC — Business Profile Management

As a business owner, I want to manage my public business profile so customers can understand my business before booking.

The owner can manage:

* Business name
* Logo
* Cover photos
* Description
* Business type
* Gender
* Contact information
* Address
* Location
* Social media
* Business registration
* Tax information

The owner can preview the customer-facing profile.

The owner can see whether required profile information is missing.

---

# EPIC — Business Types

The provider can configure the business type.

Supported types include:

* Salon
* Barber Shop
* Spa
* Beauty Center
* Nail & Lash Studio
* Independent Professional
* Home-Service Professional
* Other Beauty Business

The business type controls relevant provider and customer experiences where applicable.

---

# EPIC — Multi-Branch Management

As a business owner, I want to create multiple branches so that I can operate my business in different locations.

The owner can:

* Create branch
* Edit branch
* Activate branch
* Deactivate branch
* View branch
* Configure branch settings
* Assign branch manager
* Assign branch staff
* Assign professionals
* Configure services
* Configure branch prices
* Configure branch working hours

Each branch has its own:

* Address
* Location
* Working hours
* Services
* Prices
* Professionals
* Availability
* Bookings
* Queue
* Settings

---

# EPIC — Branch Registration

As a business owner, I want to create a branch by entering its operational information.

The owner can enter:

* Branch name
* Address
* Location
* Phone
* Email
* Working hours
* Social media
* Services
* Service prices

The branch can be activated or deactivated.

---

# EPIC — Branch Service Configuration

As a business owner, I want to control which services are available in each branch.

The owner can select services from the ZeTime master catalog.

The owner can:

* Enable service
* Disable service
* Configure branch price
* Configure duration
* Enable home service where applicable
* Configure home-service price

A service unavailable at one branch must not appear as bookable at that branch.

---

# EPIC — Branch Staff

As a business owner, I want to assign employees to branches so that each branch has the correct operational team.

The owner can:

* Add staff
* Assign branch
* Change role
* Activate staff
* Deactivate staff
* Remove staff access

Branch staff cannot access branches outside their permissions.

---

# EPIC — Role & Permission Management

As a business owner, I want to define what each employee can access.

Roles include:

* Owner
* Branch Manager
* Branch Staff

The owner can configure permissions for:

* Bookings
* Customers
* Queue
* Professionals
* Services
* Schedule
* Payments
* Reviews
* Reports
* Branch settings
* Business settings

A user must only see features permitted by their role.

---

# EPIC — Professional Management

As a business owner, I want to manage the professionals working in my business.

The owner can:

* Create professional
* Edit professional
* Activate professional
* Deactivate professional
* Assign branch
* Transfer branch
* Assign services
* Configure availability
* Enable home service
* Configure home-service eligibility
* View professional bookings
* View professional performance

---

# EPIC — Professional Profile

The business can configure:

* Name
* Photo
* Bio
* Gender
* Specialties
* Services
* Years of experience
* Languages

The profile can be shown publicly to customers.

The professional profile remains connected to the business.

Customers cannot use the professional profile to bypass the business booking flow.

---

# EPIC — Professional Service Assignment

As a business owner, I want to define which services each professional can provide.

The owner selects services from the business's enabled service catalog.

A professional can only be assigned services available in the relevant branch.

The system must prevent booking a professional for a service they are not eligible to perform.

---

# EPIC — Professional Branch Transfer

As a business owner, I want to transfer a professional between branches.

The owner selects:

* Current branch
* Destination branch
* Effective date

The system updates the professional's branch assignment.

Existing bookings must remain associated with the original booking context.

Future availability must use the new branch after the transfer becomes effective.

A professional cannot independently transfer themselves between branches.

---

# EPIC — Professional Activation

The business can activate or deactivate professionals.

A deactivated professional:

* Cannot receive new bookings
* Cannot be selected for new appointments
* Remains visible in historical records
* Retains historical bookings and reviews

Existing bookings must be handled according to the business's configured cancellation/reassignment workflow.

---

# EPIC — Freelancer Onboarding

As an independent professional, I want to create my own ZeTime Beauty profile so I can offer services without belonging to a physical salon.

The freelancer can configure:

* Name
* Photo
* Bio
* Gender
* Specialties
* Services
* Experience
* Languages
* Service areas
* Working hours
* Home-service availability
* Pricing
* Subscription

---

# EPIC — Freelancer Service Configuration

A freelancer selects services from the ZeTime master catalog.

The freelancer cannot create arbitrary service names or descriptions.

The selected services determine what the freelancer can offer.

The freelancer can configure:

* Price
* Duration
* Availability
* Home-service price
* Service area

---

# EPIC — Master Service Catalog

Providers must select services from ZeTime's master service catalog.

The provider can browse:

* Categories
* Services
* Service descriptions
* Gender/audience
* Default duration
* Other ZeTime-defined metadata

Providers cannot modify the master service definition.

Providers can configure their business-specific availability and pricing.

---

# EPIC — Service Management

As a provider, I want to manage the services offered by my business.

The provider can:

* Enable service
* Disable service
* Set price
* Set duration
* Assign professionals
* Configure branch availability
* Configure home-service price
* Configure home-service availability

---

# EPIC — Service Pricing

The business defines pricing for each branch.

A service can have different prices between branches.

The professional cannot independently override the business price.

The system must always display the correct branch price.

---

# EPIC — Service Duration

The provider can configure service duration using arbitrary minute values.

Examples:

* 20 minutes
* 30 minutes
* 45 minutes
* 60 minutes
* 90 minutes
* 120 minutes

The duration is used by the scheduling engine.

---

# EPIC — Home Service Configuration

The provider can enable home service.

The provider can define:

* Eligible professionals
* Service areas
* Home-service price
* Home-service schedule
* Assistant requirement

A professional must explicitly be eligible for home service before receiving home-service bookings.

---

# EPIC — Home Service Areas

The business selects service areas from the ZeTime geographic catalog.

The provider can:

* Add area
* Remove area
* Enable area
* Disable area

The system must verify customer address eligibility before allowing a home-service booking.

---

# EPIC — Business Working Hours

The owner can configure working hours for the business.

Support:

* Different schedules per day
* Multiple working periods
* Closed days
* Holidays
* Special dates

---

# EPIC — Branch Working Hours

Each branch can have its own working schedule.

Branch schedule can differ from the main business schedule.

The system must use branch schedule when calculating branch availability.

---

# EPIC — Professional Working Hours

The provider can configure each professional's working schedule.

Support:

* Recurring schedules
* Different schedules per day
* Multiple working periods
* Days off
* Breaks
* Vacations
* Manual blocks

---

# EPIC — Recurring Schedule

As a provider, I want to define recurring professional schedules.

The provider can define weekly patterns.

The schedule automatically applies to future dates until changed.

---

# EPIC — Manual Time Blocking

A provider can manually block professional availability.

Reasons may include:

* Break
* Personal time
* Vacation
* Meeting
* Training
* Emergency
* Other

Blocked periods must immediately affect customer availability.

---

# EPIC — Schedule Conflict Prevention

The system must prevent conflicting schedules.

A professional cannot have overlapping:

* Working periods
* Appointments
* Blocks
* Vacations

The system should warn the provider before saving conflicts.

---

# EPIC — Booking Dashboard

As a provider, I want a centralized booking dashboard so I can manage all appointments.

The dashboard should show:

* Today's appointments
* Upcoming appointments
* Pending confirmations
* Checked-in customers
* In-service customers
* Completed appointments
* Cancelled appointments
* No-shows
* Rescheduled appointments

---

# EPIC — Booking Calendar

The provider can view bookings using:

* Day
* Week
* Schedule
* Professional
* Branch

The calendar must show professional availability and appointments.

---

# EPIC — Booking Details

The provider can open a booking and view:

* Customer
* Services
* Professionals
* Branch
* Date
* Time
* Duration
* Price
* Payment method
* Booking status
* Notes
* Preferences
* Photos/forms/allergies where applicable
* Booking history

---

# EPIC — Customer Booking

When a customer creates a booking, the provider receives it according to the configured confirmation mode.

The booking can be:

* Pending confirmation
* Auto-confirmed
* Confirmed
* Rejected
* Cancelled

---

# EPIC — Auto Confirmation

The provider can configure services to auto-confirm bookings.

If auto-confirmation is enabled:

A valid booking is automatically confirmed if all booking requirements are satisfied.

---

# EPIC — Manual Confirmation

The provider can configure services to require manual confirmation.

The booking remains pending until the provider accepts or rejects it.

---

# EPIC — Confirmation Timeout

Customer-created bookings requiring provider confirmation have a response deadline.

The deadline is:

**25% of the time between booking creation and appointment start.**

Example:

Booking created at 10:00.

Appointment starts at 14:00.

Total time = 4 hours.

Provider response deadline = 1 hour.

If the provider does not respond:

The booking is automatically cancelled due to no response.

---

# EPIC — Provider Accept Booking

The provider can accept a pending booking.

Acceptance changes the booking to confirmed.

The customer receives a confirmation notification.

---

# EPIC — Provider Reject Booking

The provider can reject a pending booking.

The provider must provide a rejection reason where required.

The customer receives the rejection notification.

The system may offer alternative times/professionals.

---

# EPIC — Provider-Created Booking

The provider can manually create a booking.

Provider-created bookings bypass the customer confirmation timeout.

The provider can create bookings for:

* Existing customer
* New customer
* Walk-in customer

---

# EPIC — Manual Booking

The provider can manually create a booking by selecting:

* Customer
* Services
* Professional
* Branch
* Date
* Time
* Payment method
* Notes

The system validates availability before creating the booking.

---

# EPIC — Multiple Services Booking

The provider can create bookings containing multiple services.

Example:

* Haircut — Ahmed — 30 minutes
* Facial — Sara — 60 minutes

The booking stores the services as separate booking items.

---

# EPIC — Multiple Professional Booking

A single booking can contain services assigned to multiple professionals.

The system must maintain:

* Booking-level information
* Service-level professional assignment
* Individual service duration
* Individual service status

---

# EPIC — Same Professional Multiple Services

If the same professional performs multiple services:

The system must reserve the professional continuously for the combined duration.

Example:

Haircut 30 minutes + Facial 60 minutes = 90-minute professional occupation.

---

# EPIC — Different Professional Parallel Services

If different professionals perform different services:

Their schedules can overlap where valid.

Example:

Ahmed performs haircut from 10:00–10:30.

Sara performs facial from 10:00–11:00.

Both can occur within the same booking.

---

# EPIC — Professional Assignment

The provider can assign a professional to an unassigned booking.

The system should only show professionals who:

* Can perform the service
* Are active
* Belong to the relevant branch
* Are available
* Are not blocked
* Do not have conflicting appointments

---

# EPIC — Professional Reassignment

The provider can change the assigned professional.

The system must validate the new professional's eligibility and availability.

The customer should receive an update when the reassignment affects the appointment.

---

# EPIC — Alternative Professional

If the selected professional becomes unavailable, the provider can select another eligible professional.

The system should show available alternatives.

---

# EPIC — Appointment Lifecycle

Provider appointment states include:

* Pending Confirmation
* Confirmed
* Checked In
* In Service
* Completed
* Cancelled
* Rejected
* No Response
* No Show
* Rescheduled

State transitions must follow defined business rules.

---

# EPIC — Check-In

The provider can check a customer in.

Check-in changes the appointment state to:

Checked In.

The provider can see all checked-in customers separately.

---

# EPIC — Start Service

The provider can start the service.

The appointment changes to:

In Service.

The system records the service start time.

---

# EPIC — Complete Service

The provider can mark a service as completed.

The system records:

* Completion time
* Final payment state
* Service status

When all booking services are completed, the booking becomes completed.

---

# EPIC — Partial Service Completion

For bookings containing multiple services, the provider can complete each service individually.

The booking should remain active until all required services are completed or otherwise resolved.

---

# EPIC — Late Customer

The provider can mark a customer as late.

The business defines the grace period.

After the grace period expires, the provider can choose:

* Continue service
* Reschedule
* Cancel

---

# EPIC — No Show

The provider can mark a customer as no-show.

No-show must only be available according to configured timing/business rules.

Repeated customer no-shows may contribute to customer restrictions.

---

# EPIC — Provider Cancellation

The provider can cancel a confirmed booking.

A cancellation reason is required.

The customer receives a cancellation notification.

Refund handling is controlled by ZeTime Admin.

---

# EPIC — Customer Cancellation

The provider can view customer cancellations.

The system records cancellation history.

Repeated cancellations may affect customer booking restrictions.

---

# EPIC — Rescheduling

The provider can request a reschedule.

The provider selects:

* New date
* New time
* New professional if required

The customer must confirm the requested change.

---

# EPIC — Customer Reschedule Request

The provider can receive customer reschedule requests.

The provider can:

* Accept
* Reject
* Offer alternative time

---

# EPIC — Booking Notes

The provider can view booking notes supplied by the customer.

The provider can add operational booking notes where permitted.

Notes must respect the defined privacy model.

---

# EPIC — Customer Photos

The provider can view customer photos submitted before the appointment.

Photos are associated with the relevant booking/customer context.

---

# EPIC — Customer Forms

The provider can view customer-submitted forms where applicable.

---

# EPIC — Allergies

The provider can view relevant customer allergy information.

Important allergy information should be visible during the booking/service workflow where appropriate.

---

# EPIC — Customer CRM

The provider can manage customer records.

Customer profile includes:

* Name
* Phone
* Gender
* Appointment history
* Spending
* Notes
* Preferences
* Photos
* Forms
* Allergies

---

# EPIC — Customer Search

Provider can search customers by:

* Name
* Phone

The provider can open a customer's complete beauty profile.

---

# EPIC — Customer Appointment History

Provider can view:

* Past appointments
* Upcoming appointments
* Cancelled appointments
* No-shows
* Services used
* Professionals used
* Amount spent

---

# EPIC — Customer Spending

Provider can view customer spending history.

Spending can be summarized by:

* Total
* Period
* Service
* Branch

---

# EPIC — Customer Preferences

Provider can view and manage customer preferences relevant to the beauty experience.

---

# EPIC — Walk-In Customer

Provider can create a walk-in booking.

The provider selects:

* Existing customer or new customer
* Services
* Professional
* Branch
* Queue position

The walk-in enters the appropriate queue or schedule.

---

# EPIC — Walk-In Queue

Provider can manage walk-in customers.

The provider can:

* Add customer
* Assign professional
* Move customer
* Start service
* Complete service
* Cancel queue entry
* Mark no-show

---

# EPIC — Queue Management

The provider can view the live queue.

Queue entries can show:

* Customer
* Services
* Professional
* Position
* Estimated waiting time
* Status

---

# EPIC — Customer-Selected Professional Queue

The provider can manage queues associated with specific professionals.

A customer can wait for a selected professional.

---

# EPIC — First-Come Queue

The provider can operate a first-come queue.

Customers are served according to queue position unless operational changes are required.

---

# EPIC — Queue Position Changes

Provider can move queue entries where business rules allow.

The system records queue changes.

---

# EPIC — Queue Return

If a customer temporarily leaves and returns:

The provider can restore the customer to the appropriate queue state.

The customer's retained position must be respected.

---

# EPIC — Queue ETA

The system calculates estimated waiting time using current operational conditions.

ETA should consider:

* Current appointments
* Services
* Service durations
* Active queue
* Professional availability
* Delays
* Completed services

---

# EPIC — Payment Method

The provider can configure accepted payment methods:

* Card at provider
* Online payment
* Cash
* Apple Pay

---

# EPIC — Customer Payment Selection

During booking, the customer selects the intended payment method.

The provider can view the selected payment method.

---

# EPIC — Payment After Service

Payment occurs after service completion.

The booking records the final payment status.

---

# EPIC — Card at Provider

If card-at-provider is selected:

The provider records the payment as externally completed.

ZeTime does not operate a POS transaction.

---

# EPIC — Cash Payment

Provider can record a cash payment after service completion.

---

# EPIC — Online Payment

Provider can view online payment status.

The system must prevent duplicate payment recording.

---

# EPIC — Apple Pay

Apple Pay is treated as an online payment method.

---

# EPIC — Change Payment Method

Provider can change the payment method when business rules permit.

The system records the updated payment method.

---

# EPIC — Exactly One Payment

Each completed booking must have exactly one final payment record.

The system must prevent duplicate payments.

---

# EPIC — Refund Visibility

Provider can see refund status when applicable.

Refund processing is controlled by ZeTime Admin.

---

# EPIC — Cancellation Policy

The provider can configure cancellation rules.

The policy can define:

* Customer cancellation window
* Provider cancellation behavior
* Applicable consequences

The customer should be able to view the policy before booking.

---

# EPIC — Review Management

Provider can view customer reviews.

Reviews can be associated with:

* Business
* Service
* Professional

Only customers with completed bookings can submit reviews.

---

# EPIC — Review Reply

Provider can reply to reviews.

The reply is shown to customers where applicable.

---

# EPIC — Review Moderation

Provider can report inappropriate reviews to ZeTime Admin.

Provider cannot manipulate customer ratings.

---

# EPIC — Offers

Provider can create and manage offers where the subscribed plan allows them.

Offers can be associated with:

* Services
* Branches
* Dates
* Times
* Eligibility rules

---

# EPIC — Offer Activation

Provider can:

* Create offer
* Draft offer
* Activate offer
* Pause offer
* Expire offer

Expired offers must automatically become unavailable.

---

# EPIC — Messaging

Provider can communicate with customers through general business chat.

Chat is:

Customer ↔ Business

It is not required to be tied to a specific appointment.

---

# EPIC — Chat Access

Provider can:

* View conversations
* Send messages
* Receive messages
* View customer context
* Manage unread conversations

Permissions determine which staff can access conversations.

---

# EPIC — Notifications

Provider receives notifications for:

* New booking
* Booking cancellation
* Reschedule request
* Booking confirmation
* Booking rejection
* Customer arrival
* Queue changes
* Payment updates
* Reviews
* Subscription events
* Business approval
* Administrative messages

---

# EPIC — Notification Preferences

Provider can configure notification preferences where supported.

---

# EPIC — Subscription Management

Business owners must subscribe to ZeTime Beauty plans.

Freelancers also subscribe using freelancer plans.

---

# EPIC — Subscription Plans

ZeTime supports multiple subscription plans.

Plans can define:

* Features
* Limits
* Branch count
* Professional count
* Other platform capabilities

---

# EPIC — Subscription Status

Subscription states include:

* Trial where applicable
* Active
* Expiring
* Expired
* Cancelled
* Suspended

---

# EPIC — Expired Subscription

When a business subscription expires:

The business becomes invisible to customers.

Existing business data remains preserved.

The provider can access the account according to platform rules.

The business cannot receive new marketplace bookings while inactive.

---

# EPIC — Subscription Renewal

Owner can renew the subscription.

After successful renewal:

The business can become visible again subject to platform rules.

---

# EPIC — Branch Subscription Constraints

The system must enforce plan-specific branch limits.

If the owner reaches the branch limit, adding another branch requires an eligible plan.

---

# EPIC — Professional Limits

Plans may limit the number of professionals.

The provider must be informed when reaching the limit.

---

# EPIC — Provider Dashboard

The provider home dashboard should summarize operational activity.

Display:

* Today's bookings
* Pending confirmations
* Upcoming appointments
* Current queue
* Checked-in customers
* Revenue/payment summary
* Customer activity
* Reviews
* Alerts

The dashboard must adapt to the user's role.

---

# EPIC — Owner Dashboard

The owner can view business-wide information.

The owner can switch between branches.

The owner can view:

* All bookings
* All professionals
* All customers
* Branch performance
* Revenue
* Services
* Reviews
* Queue
* Subscription

---

# EPIC — Branch Manager Dashboard

Branch managers only see information belonging to their assigned branch.

They can manage operational activities according to their permissions.

---

# EPIC — Branch Staff Dashboard

Branch staff see only the operational functions granted by the owner.

---

# EPIC — Professional Dashboard

A professional can see their assigned:

* Appointments
* Schedule
* Services
* Customers
* Queue entries
* Home-service bookings

The professional cannot manage business-level settings unless explicitly permitted.

---

# EPIC — Business Analytics

Owner can view business analytics.

Metrics may include:

* Total bookings
* Completed bookings
* Cancelled bookings
* No-shows
* Revenue
* Average booking value
* Popular services
* Popular professionals
* Customer retention
* New customers
* Returning customers
* Queue activity

---

# EPIC — Branch Analytics

Owner can compare branches.

Metrics include:

* Bookings
* Revenue
* Customers
* Services
* Professional activity
* Cancellations
* No-shows

---

# EPIC — Professional Analytics

Provider can view professional performance.

Metrics may include:

* Appointments
* Completed services
* Cancellations
* No-shows
* Ratings
* Reviews
* Revenue contribution
* Popular services

No employee salary or commission calculations are included.

---

# EPIC — Service Analytics

Provider can view:

* Most booked services
* Service revenue
* Service ratings
* Service cancellations
* Service completion rate

---

# EPIC — Customer Analytics

Provider can analyze:

* New customers
* Returning customers
* Active customers
* Customer spending
* Booking frequency
* Cancellation rate

---

# EPIC — Business Settings

Owner can configure:

* Business information
* Branches
* Staff
* Professionals
* Services
* Schedules
* Payment methods
* Cancellation policy
* Notifications
* Home services
* Subscription
* Permissions

---

# EPIC — Branch Settings

Branch managers/owners can configure:

* Branch information
* Working hours
* Services
* Prices
* Professionals
* Staff
* Queue
* Home-service operations where permitted

---

# EPIC — Professional Settings

Professionals can manage permitted personal information:

* Photo
* Bio
* Languages
* Specialties
* Availability
* Service eligibility where owner-controlled

Business-controlled fields cannot be modified by professionals unless permission is granted.

---

# EPIC — Security

Provider authentication must support secure login.

The system must enforce:

* Role-based authorization
* Business-level authorization
* Branch-level authorization
* Professional-level authorization
* Session management
* Secure logout

---

# EPIC — Data Isolation

A provider must never access data belonging to another business.

Branch managers must not access unauthorized branches.

Staff must not access unauthorized operational information.

Professionals must not access another professional's private operational data unless explicitly permitted.

---

# EPIC — Audit Trail

Important provider actions should be recorded.

Examples:

* Booking creation
* Booking cancellation
* Booking reassignment
* Professional transfer
* Price changes
* Schedule changes
* Permission changes
* Service activation
* Branch activation
* Payment updates
* Customer updates

Audit records should identify:

* User
* Action
* Date/time
* Entity
* Previous value where applicable
* New value where applicable

---

# EPIC — Provider Search & Filters

Provider booking lists should support filtering by:

* Date
* Branch
* Professional
* Service
* Booking status
* Payment status
* Customer
* Booking type
* Home/branch service

---

# EPIC — Provider Booking Search

Provider can search bookings by:

* Booking ID
* Customer name
* Customer phone
* Professional name

---

# EPIC — Provider Customer Search

Provider can search customers by:

* Name
* Phone
* Booking history

---

# EPIC — Provider Service Search

Provider can search the master service catalog before enabling services.

---

# EPIC — Provider Calendar Filters

Calendar can be filtered by:

* Branch
* Professional
* Service
* Booking status
* Home service
* Date

---

# EPIC — Home-Service Booking Management

Provider can view home-service bookings separately.

Home booking details include:

* Customer
* Address
* Service
* Professional
* Date
* Time
* Home-service price
* Service area
* Assistant requirement
* Booking status

---

# EPIC — Home-Service Professional Assignment

The system only allows eligible home-service professionals to be assigned.

The professional must:

* Provide the selected service
* Be enabled for home service
* Cover the customer's location
* Be available at the requested time

---

# EPIC — Home-Service Schedule

Home-service schedules may differ from branch schedules.

The provider can configure independent home-service availability.

---

# EPIC — Assistant Requirement

If a home-service professional requires an assistant:

The booking workflow must identify the requirement.

The provider must ensure the required assistant is available before confirming/starting the booking according to the operational rules.

---

# EPIC — Business Availability Control

The provider can temporarily stop accepting bookings.

Possible states:

* Open
* Closed
* Temporarily unavailable

The provider can specify a reason or duration where applicable.

---

# EPIC — Emergency Closure

Owner/authorized staff can temporarily close a branch.

The system must prevent new bookings during the closure.

Existing bookings should be surfaced for operational handling.

---

# EPIC — Holiday Management

Provider can configure holidays and special closure dates.

These dates must affect availability.

---

# EPIC — Special Working Hours

Provider can define exceptional working hours for specific dates.

Special hours override normal recurring schedules for the applicable date.

---

# EPIC — Booking Conflict Protection

The backend must reject invalid bookings caused by:

* Double booking
* Professional conflict
* Schedule block
* Branch closure
* Service unavailable
* Professional unavailable
* Invalid service duration
* Invalid home-service area

The provider UI must clearly explain the conflict.

---

# EPIC — Booking Recovery

When a professional becomes unavailable after booking:

The provider should be able to:

* Reassign professional
* Reschedule
* Cancel

The customer must be notified of material changes.

---

# EPIC — Customer Restriction Visibility

Provider can see whether a customer has restrictions affecting booking.

The system may prevent booking where ZeTime has applied a restriction because of repeated cancellations/no-shows.

---

# EPIC — Provider Offline/Connectivity States

The provider app must handle:

* Offline state
* Slow connection
* Request timeout
* Retry
* Duplicate action prevention
* Server conflict
* Session expiration

Critical booking actions must not be accidentally duplicated.

---

# EPIC — Loading States

Every provider operation must support appropriate loading states.

Examples:

* Loading bookings
* Loading customers
* Loading professionals
* Loading schedules
* Loading queue
* Saving business
* Saving service
* Confirming booking
* Completing service
* Recording payment

---

# EPIC — Empty States

Provider screens must have meaningful empty states.

Examples:

* No bookings
* No customers
* No professionals
* No services
* No branches
* No queue
* No reviews
* No offers
* No analytics data

Each empty state should provide an appropriate next action.

---

# EPIC — Error States

Provider should receive understandable errors for:

* Invalid data
* Booking conflict
* Unavailable professional
* Expired subscription
* Unauthorized action
* Missing permission
* Payment failure
* Network failure
* Invalid service
* Invalid branch
* Invalid schedule

---

# EPIC — Permission States

When a provider attempts an unauthorized operation:

The system must prevent the action.

The UI should explain that the user's role does not have permission where appropriate.

---

# EPIC — Subscription Restriction States

When subscription limits are reached:

The provider should see:

* Current limit
* Current usage
* Required plan/upgrade action

The system must not silently fail.

---

# EPIC — Provider Notifications Center

Provider can access a notification center containing:

* Booking events
* Customer events
* Queue events
* Payment events
* Reviews
* Subscription events
* Administrative messages

Notifications can be marked as read.

---

# EPIC — Provider Profile

Provider account users can manage their own:

* Name
* Photo
* Phone
* Email
* Password/security
* Notification preferences

Business-controlled information remains managed by authorized business users.

---

# EPIC — Logout & Session Management

Provider can log out.

Expired sessions must require authentication.

Unauthorized sessions must not retain access to business information.

---

# EPIC — Provider State Machine

The provider business lifecycle should support:

Registration

→ Draft

→ Submitted

→ Under Review

→ Approved

→ Subscription Required

→ Active

→ Temporarily Closed

→ Suspended / Inactive

→ Expired

A provider must never become publicly bookable while failing required activation conditions.

---

# EPIC — Operational Booking State Machine

Customer booking:

Pending Confirmation

→ Confirmed

→ Checked In

→ In Service

→ Completed

Alternative terminal states:

Pending Confirmation

→ Rejected

Pending Confirmation

→ Cancelled / No Response

Confirmed

→ Cancelled

Confirmed

→ No Show

Confirmed

→ Rescheduled

---

# EPIC — Service State Machine

Service configuration:

Available

→ Enabled

→ Disabled

A disabled service:

* Cannot receive new bookings
* Remains visible in historical bookings
* Remains associated with previous customer records

---

# EPIC — Professional State Machine

Professional:

Invited / Created

→ Active

→ Temporarily Unavailable

→ Active

→ Deactivated

Historical bookings remain preserved.

---

# EPIC — Branch State Machine

Branch:

Draft

→ Active

→ Temporarily Closed

→ Active

→ Deactivated

Historical booking data remains preserved.

---

# EPIC — Queue State Machine

Queue entry:

Waiting

→ Called

→ Checked In

→ In Service

→ Completed

Alternative states:

Waiting

→ Left Temporarily

→ Returned

Waiting

→ Cancelled

Waiting

→ No Show

---

# EPIC — Payment State Machine

Payment:

Pending

→ Paid

Or:

Pending

→ Failed

→ Payment Method Changed

→ Paid

Refund flow:

Paid

→ Refund Requested

→ Refunded

Refund decisions and execution remain controlled by ZeTime Admin.

---

# EPIC — Provider Business Rules

The implementation must enforce these rules:

* One professional works at one branch at a time.
* Professional branch transfer is controlled by the business owner.
* Services originate from the ZeTime master catalog.
* Providers cannot create arbitrary master services.
* Service prices can differ by branch.
* Service duration is configurable.
* Professionals cannot independently override business service pricing.
* Professionals can only perform assigned services.
* Multiple services can exist in one booking.
* Multiple professionals can participate in one booking.
* Same professional services reserve continuous time.
* Different professionals can work in parallel.
* No resource/chair/room management is required for MVP.
* No staff salary management is required.
* No staff commission system is required.
* Provider-created bookings bypass the 25% confirmation timeout.
* Customer-created manual-confirmation bookings follow the 25% confirmation rule.
* Provider cancellation requires a reason.
* Customer/provider reschedule requests require the other party's confirmation.
* Provider-configured grace period controls late handling.
* Provider can choose reschedule or cancel after the grace period.
* No-show is controlled by provider.
* Exactly one final payment exists per completed booking.
* Refund processing is controlled by ZeTime Admin.
* Home-service eligibility is professional-specific.
* Home-service areas come from the ZeTime geographic catalog.
* Home-service schedules can differ from branch schedules.
* Expired subscriptions hide the business from customer discovery.
* Business data remains preserved after subscription expiration.
* Public professional profiles cannot bypass the business booking flow.
* Customer booking availability must always reflect real professional availability.
* A deactivated professional cannot receive new bookings.
* A deactivated branch cannot receive new bookings.
* A disabled service cannot receive new bookings.
* Historical records must remain preserved.

---

# EPIC — Provider Definition of Done

The Provider Side is considered complete when:

* Business registration works.
* Business approval state is supported.
* Subscription activation is supported.
* Business profile management works.
* Multiple branches work.
* Branch-level services work.
* Branch-level prices work.
* Owner/manager/staff permissions work.
* Professional management works.
* Professional service assignment works.
* Professional transfer works.
* Freelancer flow works.
* Master service catalog integration works.
* Business schedules work.
* Branch schedules work.
* Professional schedules work.
* Recurring schedules work.
* Manual blocks work.
* Customer CRM works.
* Booking creation works.
* Provider-created bookings work.
* Customer bookings work.
* Auto-confirmation works.
* Manual confirmation works.
* 25% confirmation timeout works.
* Professional assignment works.
* Professional reassignment works.
* Multiple services work.
* Multiple professionals work.
* Check-in works.
* Service start works.
* Service completion works.
* Late handling works.
* No-show works.
* Cancellation works.
* Rescheduling works.
* Walk-in booking works.
* Queue management works.
* Queue ETA works.
* Home-service booking works.
* Home-service professional eligibility works.
* Home-service areas work.
* Home-service schedules work.
* Payment methods work.
* Payment recording works.
* Exactly-one-payment rule works.
* Refund status visibility works.
* Reviews work.
* Provider replies work.
* Offers work.
* Messaging works.
* Notifications work.
* Analytics work.
* Business settings work.
* Branch settings work.
* Provider security works.
* Role-based permissions work.
* Audit logging works.
* Error states work.
* Empty states work.
* Loading states work.
* Offline/retry handling works.
* Subscription expiration restrictions work.
* All booking state transitions are validated server-side.
* All branch/business data isolation is enforced server-side.
* All critical provider actions are permission-controlled.
