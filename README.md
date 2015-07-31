# EasyCSP
MVC Framework for InterSystems Cache
Short Description of EasyCSP
Extends existing Cache code with little disturbance. Rapid development cycle to bring legacy character applications to the web without the need for external tools.

Designed for Software As Service (SAS) sites; single database having many customers with strong walls between, a single presentation framework that can automatically select look and feel based on customer, a single application framework supporting many types of business logic.

Rapid application design through reduced coding. Much of the presentation relies on proper use of DocuMatic and completeness of property attributes.

Simple, rule-based validation. Validation is accomplished through drop-ins. Instead of writing separate getters, setters, and validators, data integrity is checked each time a model attribute value is changed.

Simple, rule-based access to pages and processes. As with validation, access is controlled by drop-ins. Access can be granted or denied to whole groups or a single user.

Separation of custom, site-specific code and framework code. Overriding or adding rules or validation can be accomplished by writing a similar drop-in with the same name then adding it to the same-named package in the local data namespace.

Easy extension of framework capabilities by adding drop-in code. There is no need to modify framework code. The framework operates with object factories so custom objects will be sought and selected first then stock objects will be selected if no override can be found.

Exceptions are handled then displayed to an error page that describes the problem and how to fix it. Simple annoyances such as unassigned variables no longer need to result in a blank web page.

Site look and feel is accomplished through layout classes. Layouts can be selected on the fly for a group or company, or for an individual user based on user credentials. For instance, if you are providing software as a service, you may have a layout for each company you support, each with custom logos, colors, buttons, etc. To implement, use your own CSS then clone-and-modify one of the EasyCSP layout classes or create your own layout CSS and class.

Script inclusion is handled in the layouts. A process will have only the scripting it needs. Views may also add custom scripting in addition to that loaded in the layout.

Script librarying is handled in one class that can also be overridden. Stock scripts such as jQuery, jQueryUI, etc can be registered once then included in a layout as needed.

Form and page generation is reduced to providing lists of model attributes to a control generator. Validation can be accomplished either on the client side (using jQueryUI validator) or at the server using model attribute validation. A mix is typical.

Validation errors are reflected to the UI so the user may correct input errors. Both form-wide and individual input error reporting is supported (the default is both).

Simplified validation error detection in the model. At the simplest implementation, the controller can call modelName.hasErrors() and request the form – with input intact plus errors highlighted – be re-rendered then can stop there without changing data in the %Persistent class. %Persistent data for a given attribute is not changed until all new input passes validation. There is no need to write separate getters, setters, and validators.

The typical Caché programmer will not need to be expert with HTML. The framework will build valid HTML 5 each and every time without the need for the Cache programmer to understand nuances of HTML attributes. Input type is selected automatically by the HTML control-group generator and handled with jQuery-UI. Jquery-UI validation is loaded automatically for specific types such as email addresses, etc.

Strict model-controller-view design. This makes for very simple extension or overriding of stock EasyCSP classes. Allows for strict organization of code: business rules in controllers, data validation and storage through models, and greatly reduced coding of UI components in the views.

Leveraging of existing code by extending %Persistent classes with one of the EasyCSP model classes: EasyCSP.Model.Base for traditional %Persistent classes and EasyCSP.MVModel.Base for MV %Persistents.

Use of Xdata segments is supported for visual boilerplate or long passages of static HTML.

Contains a default user registration and user validation process. This can be overridden as well by the creation of a custom login process. For added security, user demographic and user status and security information are in separate tables. Passwords are stored as AES encrypted strings.

Security is further enhanced by the fact that actual process names, class names, and the like are never exposed in the URL. Process control is handled through a route manager that automatically selects the proper controller and view based on customs, security rules, etc.

Project managers will appreciate the strict use of libraries for consistent coding as well as the use of class documentation for UI presentation. This also relieves a great deal of coding burden from the programmer. Consistency is the likely the most attractive feature of EasyCSP.

Programmers will appreciate the low learning-curve as well as the ease of extending EasyCSP features. Custom rules for security, validation, layout, and presentation can be accomplished in minutes instead of days.

Architecture – The Thirty-Thousand-Foot View
The root of the web process starts at the site index application. The index is a short CSP page that creates and maintains a instance of the EasyCSP application. Top-level error handling resides here. There is no output rendered at this level.

The application examines the request, parses the route, saves the complete web environment, and then selects the controller. The controller applies access rules and may elect to complete the request based on the result of the application of the access rules. When a controller completes its task, the application compiles and outputs the web page. Exceptions are handled gracefully at this level. If a controller, model, or view encounters a system or application exception, flow is redirected to an error output page (in place of the stock CSP error page), keeping look-and-feel within the site's layout.

A controller can select a layout for rendering a page based on whatever rules a given installation may choose to apply. It should be noted here that controllers, models, and views are selected through object factories, thus installation-specific custom code will be selected ahead of default, EasyCSP-supplied classes. The rules for overriding classes are very, very simple and easy to grasp instantly. A layout is a page with various containers for output including the HTML <head> section, script inclusion, and a place for view content to reside.

Business logic is contained at the controller level and is divided into types of action. An “action” is a processing request, such as “give me an index page for this process”, “edit a record in a given global”, “create a new record in a given global”, or perhaps “give me a report from a  table/global based on parameters I supply in a form”. All controller action methods begin with the string “action”. There are several controller events that may be used. Among these are beforeactionName(), afteractionName(), beforeRender(), and afterRender().

Of course, a site may elect to extend these capabilities by extending the controller base class in the site's own namespace.

During the course of an action, the selected layout will also use an object factory to select a view. A view is where user input processing occurs and the “middle”, working portion of a page is built. The Caché programmer does not need specific HTML knowledge; there is a generator for HTML elements that will produce valid HTML 5. By using the control-group generator, web forms or displays can be generated quickly without any specific knowledge of HTML.

Models are representations and extensions of a %Persistent class. Models provide validation of input and formatting of output by the application of rules. Rules may be added to the framework at any moment through plug-ins and may be immediately applied by adding a call to addValidationRule() in the model. Rules are identified by simple names (“Numeric”, “Email”, “Password”, and such like) and are also selected through object factories. For instance, if the rule for a valid password (as supplied in the framework) does not fit a installation's requirements, the programmer may add a new “Password” validation rule in the user application namespace. That rule is instantly available in the user namespace.

Models contain a consistent method of detecting and reporting errors, making errors consistently reportable through the use of EasyCSP components, making it simple for the user to see and correct input errors. For the Caché programmer, this means consistent, predictable UI interaction without the need to repeat (and in many cases, even to add) code for error reporting and handling. User messaging is provided as a parameter in each validator class.

For user comfort and ease-of-use, class property documentation is leveraged for tool tips on labels. Labels for inputs can (by default) be automatically generated from column names or may be overridden by setting the label on an attribute manually if desired.

A %Persistent class that extends EasyCSP.Model.Base or EasyCSP.MVModel.Base inherits automatic, rules-based validation and data integrity enforcement. Much of the information used by the web UI generator comes from the extended model class. Column or input box labels, tooltips, and the like are automatically generated but of course can be easily overridden.

