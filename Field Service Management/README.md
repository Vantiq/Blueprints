# Field Service Management
### Summary

VANTIQ Blueprints are working applications that are designed to be imported into the VANTIQ platform as a new project and then customized by users who are looking to create applications that will perform similar functions. The benefit of using a Blueprint is starting off with an application that has a completed code base to bootstrap a new project being undertaken. Although Blueprints are complete working applications they are not intended to be used "as-is", rather they are intended to speed up development of a new application by providing a completed and working set of base components and functionality to build upon and customize. 

Field Service Management (FSM) describes a category of business that provides services for IT related hardware and software. This will commonly include technical support for hardware and software problems, installation and removal of hardware and software, management of licenses and consulting services. 

The FSM Blueprint was built with common business practices for an FSM company in mind. These include:

*	A Service Desk that receives service or support requests and provides customer support.
*	Field technicians who are dispatched to handle problems that require an onsite presence. 
*	Varying skills between technicians, one technician may specialize in certain hardware, another in certain software. 
*	A structured process that supports customer support lifecycle.  

### Problem Statement

This project was built to provide an answer to the following challenges typical to today's FSM practices and solutions.

*	Customer experience suffers from infrequent communication and lack of visible insight especially on long duration high priority issues. 
*	Dispatching of a field technician is a slow process with manual steps that are prone to human error.
*	Inability to identify or predict response times to customer issues is preventing meeting SLA demands. 
*	Lack of accurate time and effort tracking for field technicians makes it difficult to staff appropriate to demand and meet the expected levels of customer service. 

The FSM Blueprint is an application built to provide ideal solutions these challenges. If this describes the type of business that you are building application for or contains similarities this Blueprint will help jump start your project. 

### This Project Contains

*	Web based ticketing system that supports creating tickets, Workorders, customers, technicians, service desk users, assets and reporting. 
*	Mobile application that use the VANTIQ mobile app to provide alerts, notifications and interactions with users and technicians. 
*	Automated technician dispatch capability that will identify the proper field technician for a Workorder based on their location and skillset. 
*	SLA monitoring that will escalate Workorders that are not being progressed in time.
*	Reports that provide insights and analytics. 
*	A process/workflow for handling open tickets and Workorders. 
*	Security Profiles that provide ACL based security for users. 

If you need assistance with getting started, please contact VANTIQ's technical support team at support@vantiq.com .

Note: To get the full effect at runtime in the ServiceDesk client Work Orders detail page, you need to accommodate
after import the referenced CSS custom asset public/status/status_image_flow.css to match your namespace at runtime
e.g. replace here for 'background : url' referenced namespace 'br_acmeWater' in between 'NS' and 'status' properties
with 'my_fsmblueprint_ns' at these 10 positions :

/* To use CSS - change the namespace name and folder where images are uploaded. Update 'left' positions. */
#list_image {
                background : url(../ui/docs/NS/br_acmeWater/status/list_image.png) no-repeat;
                position: absolute;
...
}
#list_gray {
                background : url(../ui/docs/NS/br_acmeWater/status/list_gray.png) no-repeat;
                position: absolute;
...
}
#person_image {
                background : url(../ui/docs/NS/br_acmeWater/status/person_image.png) no-repeat;
                position: absolute;
...
}
#person_gray {
                background : url(../ui/docs/NS/br_acmeWater/status/person_gray.png) no-repeat;
                position: absolute;
...
}
#enroute_image{
                background : url(../ui/docs/NS/br_acmeWater/status/enroute_image.png) no-repeat;
                position: absolute;
...
}
#enroute_gray{
                background : url(../ui/docs/NS/br_acmeWater/status/enroute_gray.png) no-repeat;
                position: absolute;
...
}
#technician_image{
                background : url(../ui/docs/NS/br_acmeWater/status/technician_image.png) no-repeat;
                position: absolute;
...
}
#technician_gray{
                background : url(../ui/docs/NS/br_acmeWater/status/technician_gray.png) no-repeat;
                position: absolute;
...
}
#checkbox_image{
                background : url(../ui/docs/NS/br_acmeWater/status/checkbox_image.png) no-repeat;
                position: absolute;
...
}
#checkbox_gray{
                background : url(../ui/docs/NS/br_acmeWater/status/checkbox_gray.png) no-repeat;
                position: absolute;
...
}


Note: when updating this project in Github, use the CLI to export the files, not VCS by CLI's VCSSERVER. 
The export format in the Github repository is in the CLI full-namespace export structure and not the 
UI VCSSERVER per-project export structure.