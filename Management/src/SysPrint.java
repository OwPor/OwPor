/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author Vince
 */
public class SysPrint {
    void sysP(int check, String val) {
        if (check == 1){
            java.lang.System.out.println(val);
        }
        else if (check == 0) {
            java.lang.System.err.println(val);
        }
    }
}
