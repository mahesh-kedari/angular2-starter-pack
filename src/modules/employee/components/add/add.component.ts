/** Angular Dependencies */
import { OnInit, Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
/** Other Module Dependencies */
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { EmployeeService } from '../../services/employee.service';
import { EMPLOYEE_ACTIONS } from '../../store/employee.actions';
import { DesignationService } from '../../../designation/services/designation.service';
import { DESIGNATION_ACTIONS } from '../../../designation/store/designation.actions';
import { DepartmentService } from '../../../department/services/department.service';
import { DEPARTMENT_ACTIONS } from '../../../department/store/department.actions';
import { AreaService } from '../../../area/services/area.service';
import { AREA_ACTIONS } from '../../../area/store/area.actions';
import { ShiftService } from '../../../shift/services/shift.service';
import { SHIFT_ACTIONS } from '../../../shift/store/shift.actions';
import { UserService } from '../../../admin/services/user.service';
import { USER_ACTIONS } from '../../../admin/store/user/user.actions';
import { Subscription } from 'rxjs/Subscription';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'admin-saveEmployee-list',
    templateUrl: 'add.component.html',
    styleUrls: ['add.component.css']
})

export class EmployeeSaveComponent implements OnInit {
    areaList: any[];
    designationList: any[];
    departmentList: any[];
    shiftList: any[];
    emp: any;
    empId:any;
    userList: any[];
    appModuleList: any = []
    employeeForm: FormGroup;
    selectedEmployee: any;
    constructor(
        private store: Store<any>,
        private formBuilder: FormBuilder,
        private employeeService: EmployeeService,
        private areaService: AreaService,
        private designationService: DesignationService,
        private departmentService: DepartmentService,
        private shiftService: ShiftService,
         private UserService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        ) {
    }
    ngOnInit() {
        this.getArea();
        this.getDepatment();
        this.getDesignation();
        this.getShift();
        this.getUser();
        this.resetForm();
        if(this.empId !== 'undefined') {
            this.route
        .params
        .subscribe(params => {
            debugger
            this.empId = params['employeeID'];
            this.getEmployeeByID(this.empId);
        });
        
        }
         
       
        this.store.select('area').subscribe((res:any) => {
           this.areaList = res;
        });
        this.store.select('shift').subscribe((res:any) => {
           this.shiftList = res;
        });
        this.store.select('designation').subscribe((res:any) => {
           this.designationList = res;
        });
        this.store.select('department').subscribe((res:any) => {
           this.departmentList = res;
        });
        this.store.select('user').subscribe((res:any) => {
           this.userList = res.userList;
        });
        this.store.select('employee').subscribe((res:any) => {
           this.emp = res;
           this.setEmployee(this.emp);
        });
 


    }
    
    setEmployee(emp:any){
        console.log(emp)
        debugger;
         this.employeeForm.controls['shiftID'].setValue(emp.shiftID);
         //this.employeeForm.controls['organizationJoiningDate'].setValue(emp.serviceJoiningDate);
        this.employeeForm.get('dateOfBirth').setValue(emp.dateOfBirth);
        this.employeeForm = this.formBuilder.group({
            firstName: emp.firstName,
            lastName: emp.lastName,
            employeeCode: emp.employeeCode,
            dateOfBirth: emp.dateOfBirth,
            gender: emp.gender,
            mobile: emp.mobile,
            email: emp.email,
            organizationJoiningDate: emp.organizationJoiningDate,
            serviceJoiningDate: emp.serviceJoiningDate,
            address1: emp.address1,
            departmentID:emp.departmentID,
            areaID:emp.areaID,
            designationID:emp.designationID,
           
            shiftID:emp.shiftID,
             userID:emp.userID,
            residencePhone1:emp.residencePhone1,
            address2:emp.address2
        });
    }
    resetForm() {
        this.employeeForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            employeeCode: ['', [Validators.required]],
            dateOfBirth: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            mobile: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            organizationJoiningDate: ['', [Validators.required]],
            serviceJoiningDate: ['', [Validators.required]],
            address1: ['', [Validators.required]],
            departmentID:['', [Validators.required]],
            areaID:['', [Validators.required]],
            designationID:['', [Validators.required]],
            shiftID:['', [Validators.required]],
             userID:'',
            residencePhone1:'',
            address2:''
        });
    }


    getEmployeeByID(id:any) {
        debugger
        this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST_BY_ID,payload: { id: id } });
    }

    getArea() {
        this.store.dispatch({ type: AREA_ACTIONS.GET_LIST });
    }

    getDesignation() {
        this.store.dispatch({ type: DESIGNATION_ACTIONS.GET_LIST });
    }

    getDepatment() {
        this.store.dispatch({ type: DEPARTMENT_ACTIONS.GET_LIST });
    }

    getShift() {
        this.store.dispatch({ type: SHIFT_ACTIONS.GET_LIST });
    }

    getUser() {
        this.store.dispatch({ type: USER_ACTIONS.GET_LIST });
    }


    onSubmit({ value, valid }: { value: any, valid: boolean }) {
        if (value.employeeID == "" || !value.employeeID) {
            this.employeeService.addEmployee(value)
                .subscribe(
                results => {
                    this.resetForm();
                });
        } else {
            this.employeeService.saveEmployee(value.employeeID, value)
                .subscribe(
                results => {
                    this.resetForm();
                });
        }

    }

}

