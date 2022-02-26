from django.contrib import admin

from todo.models import ToDo 

class ToDoAdmin(admin.ModelAdmin):
    exclude = ['created', 'updated']
    readonly_fields = ['created', 'updated']
    class Meta:
        model = ToDo
    
admin.site.register(ToDo, ToDoAdmin)